// The quiz's rules, with no browser code in them, so every rule can be unit
// tested. src/scripts/quiz.ts connects these rules to the page.

export const ANSWERS = ['republicans', 'nationalists'] as const;
export type Answer = (typeof ANSWERS)[number];

export type Verdict = 'communist' | 'fascist';

/** The whole joke: whichever side you sympathize with, this is what you are told. */
export const VERDICT: Readonly<Record<Answer, Verdict>> = {
  republicans: 'communist',
  nationalists: 'fascist',
};

export function isAnswer(value: unknown): value is Answer {
  return typeof value === 'string' && (ANSWERS as readonly string[]).includes(value);
}

export type QuizState =
  { screen: 'intro' } | { screen: 'question' } | { screen: 'result'; answer: Answer };

export type QuizEvent =
  { type: 'start' } | { type: 'answer'; answer: Answer } | { type: 'restart' };

const INTRO: QuizState = { screen: 'intro' };

/**
 * intro --start--> question --answer--> result --restart--> intro
 *
 * An event that does not belong to the current screen changes nothing and
 * returns the same state object, so callers can tell with `===`.
 */
export function transition(state: QuizState, event: QuizEvent): QuizState {
  switch (state.screen) {
    case 'intro':
      return event.type === 'start' ? { screen: 'question' } : state;
    case 'question':
      return event.type === 'answer' ? { screen: 'result', answer: event.answer } : state;
    case 'result':
      return event.type === 'restart' ? INTRO : state;
  }
}

/**
 * What is written into the browser's history for each step, so the Back and
 * Forward buttons move between screens.
 *
 * A result entry holds only a random key, never the answer. The answer for
 * that key lives in memory, so it is gone as soon as the page is reloaded or
 * closed (docs/decisions/0006).
 */
export type HistoryEntry =
  { quiz: 'intro' } | { quiz: 'question' } | { quiz: 'result'; key: string };

/** Reads whatever is in `history.state`. Anything unexpected is treated as nothing. */
export function parseHistoryEntry(raw: unknown): HistoryEntry | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const { quiz, key } = raw as Record<string, unknown>;
  if (quiz === 'intro' || quiz === 'question') return { quiz };
  if (quiz === 'result' && typeof key === 'string' && key !== '') return { quiz, key };
  return null;
}

/** The three things the quiz needs from the browser's History API. */
export interface HistoryPort {
  readonly state: unknown;
  pushState(entry: HistoryEntry): void;
  replaceState(entry: HistoryEntry): void;
}

/** One visitor's run through the quiz, for as long as the page stays loaded. */
export class QuizSession {
  readonly #history: HistoryPort;
  readonly #loadId: string;
  readonly #answers = new Map<string, Answer>();
  #results = 0;
  #state: QuizState = INTRO;
  #entry: HistoryEntry = { quiz: 'intro' };

  /**
   * @param loadId Any value that is different on every page load. It keeps
   * result entries left in the history by an earlier load from being mistaken
   * for results of this one.
   */
  constructor(history: HistoryPort, loadId: string) {
    this.#history = history;
    this.#loadId = loadId;
    this.restore(history.state);
  }

  get state(): QuizState {
    return this.#state;
  }

  /** Handles a button press. Returns true if the screen changed. */
  dispatch(event: QuizEvent): boolean {
    const next = transition(this.#state, event);
    if (next === this.#state) return false;

    this.#state = next;
    if (next.screen === 'result') {
      this.#results += 1;
      const key = `${this.#loadId}:${this.#results}`;
      this.#answers.set(key, next.answer);
      this.#entry = { quiz: 'result', key };
    } else {
      this.#entry = { quiz: next.screen };
    }
    this.#history.pushState(this.#entry);
    return true;
  }

  /**
   * Shows the screen that belongs to a history entry: on page load, and when
   * the visitor presses Back or Forward. A result whose answer is no longer
   * in memory cannot be shown, so that entry becomes the intro again.
   */
  restore(raw: unknown): void {
    const entry = parseHistoryEntry(raw);

    if (entry?.quiz === 'intro' || entry?.quiz === 'question') {
      this.#state = { screen: entry.quiz };
      this.#entry = entry;
      return;
    }
    const answer = entry ? this.#answers.get(entry.key) : undefined;
    if (entry && answer) {
      this.#state = { screen: 'result', answer };
      this.#entry = entry;
      return;
    }
    this.#state = INTRO;
    this.#entry = { quiz: 'intro' };
    this.#history.replaceState(this.#entry);
  }

  /**
   * An in-page link such as "Skip to main content" adds a history entry with
   * nothing in it. This writes the current screen into that entry, so coming
   * back to it later shows the right screen.
   */
  restamp(): void {
    this.#history.replaceState(this.#entry);
  }
}
