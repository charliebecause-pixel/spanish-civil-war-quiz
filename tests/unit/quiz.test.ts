import { describe, expect, it } from 'vitest';
import {
  ANSWERS,
  isAnswer,
  parseHistoryEntry,
  QuizSession,
  transition,
  VERDICT,
  type HistoryEntry,
  type HistoryPort,
  type QuizState,
} from '../../src/lib/quiz';

// These tests are written from the project brief, not from the code:
//   - one question, with the answers "Republicans" and "Nationalists"
//   - Republicans -> "YOU'RE A COMMUNIST!!!", Nationalists -> "YOU'RE A FASCIST!!!"
//   - clicking an answer ends the quiz; "take quiz again" resets the page
//   - the answer is never stored (docs/ARCHITECTURE.md, section 3)

/** Behaves like the browser's history for one tab: a list of entries and a position. */
class FakeHistory implements HistoryPort {
  entries: unknown[] = [null];
  index = 0;

  get state(): unknown {
    return this.entries[this.index];
  }
  pushState(entry: HistoryEntry): void {
    this.entries.splice(this.index + 1);
    this.entries.push(structuredClone(entry));
    this.index += 1;
  }
  replaceState(entry: HistoryEntry): void {
    this.entries[this.index] = structuredClone(entry);
  }
  /** Following an in-page link such as #main adds an entry with no state. */
  followFragmentLink(): void {
    this.entries.splice(this.index + 1);
    this.entries.push(null);
    this.index += 1;
  }
}

/** A page with the quiz on it. `back`, `forward` and `reload` do what the browser buttons do. */
function openPage(history = new FakeHistory(), loadId = 'load-1') {
  let session = new QuizSession(history, loadId);
  let loads = 1;
  return {
    history,
    get state(): QuizState {
      return session.state;
    },
    get session(): QuizSession {
      return session;
    },
    start: () => session.dispatch({ type: 'start' }),
    answer: (answer: 'republicans' | 'nationalists') =>
      session.dispatch({ type: 'answer', answer }),
    restart: () => session.dispatch({ type: 'restart' }),
    back() {
      if (history.index === 0) throw new Error('Back would leave the page.');
      history.index -= 1;
      session.restore(history.state);
    },
    forward() {
      if (history.index === history.entries.length - 1)
        throw new Error('Nothing to go forward to.');
      history.index += 1;
      session.restore(history.state);
    },
    /** Everything in memory is lost. The history entries stay, as they do in a browser. */
    reload() {
      loads += 1;
      session = new QuizSession(history, `load-${loads}`);
    },
  };
}

describe('the verdict', () => {
  it('tells Republican sympathizers they are communists', () => {
    expect(VERDICT.republicans).toBe('communist');
  });

  it('tells Nationalist sympathizers they are fascists', () => {
    expect(VERDICT.nationalists).toBe('fascist');
  });

  it('offers exactly those two answers, Republicans first', () => {
    expect(ANSWERS).toEqual(['republicans', 'nationalists']);
  });

  it('recognises an answer and nothing else', () => {
    expect(isAnswer('republicans')).toBe(true);
    expect(isAnswer('nationalists')).toBe(true);
    for (const other of ['Republicans', 'communist', '', undefined, null, 1, {}]) {
      expect(isAnswer(other)).toBe(false);
    }
  });
});

describe('transition', () => {
  const intro: QuizState = { screen: 'intro' };
  const question: QuizState = { screen: 'question' };
  const result: QuizState = { screen: 'result', answer: 'republicans' };

  it('goes from the intro to the question when Start is pressed', () => {
    expect(transition(intro, { type: 'start' })).toEqual(question);
  });

  it('ends the quiz with a result as soon as an answer is chosen', () => {
    expect(transition(question, { type: 'answer', answer: 'republicans' })).toEqual({
      screen: 'result',
      answer: 'republicans',
    });
    expect(transition(question, { type: 'answer', answer: 'nationalists' })).toEqual({
      screen: 'result',
      answer: 'nationalists',
    });
  });

  it('goes back to the intro when the quiz is taken again', () => {
    expect(transition(result, { type: 'restart' })).toEqual(intro);
  });

  it('ignores anything that does not belong to the current screen', () => {
    expect(transition(intro, { type: 'answer', answer: 'republicans' })).toBe(intro);
    expect(transition(intro, { type: 'restart' })).toBe(intro);
    expect(transition(question, { type: 'start' })).toBe(question);
    expect(transition(question, { type: 'restart' })).toBe(question);
    expect(transition(result, { type: 'start' })).toBe(result);
  });

  it('does not let a result be changed without going back to the question', () => {
    expect(transition(result, { type: 'answer', answer: 'nationalists' })).toBe(result);
  });
});

describe('parseHistoryEntry', () => {
  it('accepts the three kinds of entry the quiz writes', () => {
    expect(parseHistoryEntry({ quiz: 'intro' })).toEqual({ quiz: 'intro' });
    expect(parseHistoryEntry({ quiz: 'question' })).toEqual({ quiz: 'question' });
    expect(parseHistoryEntry({ quiz: 'result', key: 'a:1' })).toEqual({
      quiz: 'result',
      key: 'a:1',
    });
  });

  it('drops anything extra that was stored beside them', () => {
    expect(parseHistoryEntry({ quiz: 'intro', answer: 'republicans' })).toEqual({ quiz: 'intro' });
  });

  it.each([
    ['nothing', null],
    ['undefined', undefined],
    ['text', 'result'],
    ['a number', 3],
    ['a list', ['intro']],
    ['an unknown screen', { quiz: 'admin' }],
    ['a result with no key', { quiz: 'result' }],
    ['a result with an empty key', { quiz: 'result', key: '' }],
    ['a result with a non-text key', { quiz: 'result', key: 7 }],
    ['an answer where a screen should be', { quiz: 'republicans' }],
  ])('treats %s as no entry', (_name, raw) => {
    expect(parseHistoryEntry(raw)).toBeNull();
  });
});

describe('a run through the quiz', () => {
  it('opens on the intro', () => {
    const page = openPage();
    expect(page.state).toEqual({ screen: 'intro' });
    expect(page.history.entries).toEqual([{ quiz: 'intro' }]);
  });

  it('start, answer, result, take it again', () => {
    const page = openPage();

    expect(page.start()).toBe(true);
    expect(page.state).toEqual({ screen: 'question' });

    expect(page.answer('republicans')).toBe(true);
    expect(page.state).toEqual({ screen: 'result', answer: 'republicans' });

    expect(page.restart()).toBe(true);
    expect(page.state).toEqual({ screen: 'intro' });
  });

  it('adds exactly one history entry per screen change', () => {
    const page = openPage();
    page.start();
    page.answer('nationalists');
    page.restart();
    expect(page.history.entries.map((entry) => (entry as HistoryEntry).quiz)).toEqual([
      'intro',
      'question',
      'result',
      'intro',
    ]);
  });

  it('a second press of the same button does nothing', () => {
    const page = openPage();
    expect(page.start()).toBe(true);
    expect(page.start()).toBe(false);
    expect(page.history.entries).toHaveLength(2);

    expect(page.answer('republicans')).toBe(true);
    expect(page.answer('nationalists')).toBe(false);
    expect(page.state).toEqual({ screen: 'result', answer: 'republicans' });
    expect(page.history.entries).toHaveLength(3);
  });
});

describe('the Back and Forward buttons', () => {
  it('step through the screens in order', () => {
    const page = openPage();
    page.start();
    page.answer('republicans');

    page.back();
    expect(page.state).toEqual({ screen: 'question' });
    page.back();
    expect(page.state).toEqual({ screen: 'intro' });

    page.forward();
    expect(page.state).toEqual({ screen: 'question' });
    page.forward();
    expect(page.state).toEqual({ screen: 'result', answer: 'republicans' });
  });

  it('let the visitor go back and pick the other side', () => {
    const page = openPage();
    page.start();
    page.answer('republicans');
    page.back();

    page.answer('nationalists');
    expect(page.state).toEqual({ screen: 'result', answer: 'nationalists' });
    // The first result is no longer reachable, as with any page you go back from.
    expect(page.history.entries).toHaveLength(3);
  });

  it('show the earlier result again after the quiz was restarted', () => {
    const page = openPage();
    page.start();
    page.answer('republicans');
    page.restart();

    page.back();
    expect(page.state).toEqual({ screen: 'result', answer: 'republicans' });
  });

  it('remember each result separately when the quiz is taken twice', () => {
    const page = openPage();
    page.start();
    page.answer('republicans');
    page.restart();
    page.start();
    page.answer('nationalists');
    expect(page.state).toEqual({ screen: 'result', answer: 'nationalists' });

    page.back(); // question
    page.back(); // intro
    page.back(); // the first result
    expect(page.state).toEqual({ screen: 'result', answer: 'republicans' });

    page.forward();
    page.forward();
    page.forward();
    expect(page.state).toEqual({ screen: 'result', answer: 'nationalists' });
  });

  it('keep the right screen for an entry made by an in-page link', () => {
    const page = openPage();
    page.start();
    page.history.followFragmentLink(); // "Skip to main content" on the question screen
    page.session.restamp();
    page.answer('republicans');

    page.back();
    expect(page.state).toEqual({ screen: 'question' });
    page.back();
    expect(page.state).toEqual({ screen: 'question' });
    page.back();
    expect(page.state).toEqual({ screen: 'intro' });
  });
});

describe('the answer is never stored', () => {
  it('nothing written to the history says which side was chosen', () => {
    const page = openPage();
    page.start();
    page.answer('republicans');
    page.restart();
    page.start();
    page.answer('nationalists');

    const stored = JSON.stringify(page.history.entries).toLowerCase();
    for (const word of ['republican', 'nationalist', 'communist', 'fascist']) {
      expect(stored).not.toContain(word);
    }
  });

  it('two results look the same in the history apart from a counter', () => {
    const first = openPage(new FakeHistory(), 'same');
    first.start();
    first.answer('republicans');
    const second = openPage(new FakeHistory(), 'same');
    second.start();
    second.answer('nationalists');
    expect(first.history.entries).toEqual(second.history.entries);
  });

  it('reloading on a result goes back to the intro, and the result cannot be brought back', () => {
    const page = openPage();
    page.start();
    page.answer('republicans');

    page.reload();
    expect(page.state).toEqual({ screen: 'intro' });
    expect(page.history.state).toEqual({ quiz: 'intro' });
  });

  it('reloading on the question stays on the question', () => {
    const page = openPage();
    page.start();
    page.reload();
    expect(page.state).toEqual({ screen: 'question' });
  });

  it('a result left in the history by an earlier load shows the intro, not a result', () => {
    const page = openPage();
    page.start();
    page.answer('republicans');
    page.back();
    page.reload();
    expect(page.state).toEqual({ screen: 'question' });

    page.forward();
    expect(page.state).toEqual({ screen: 'intro' });
    expect(page.history.state).toEqual({ quiz: 'intro' });
  });

  it('a new answer after a reload does not revive results from before the reload', () => {
    const page = openPage();
    page.start();
    page.answer('republicans'); // the first result of the first load
    page.restart();
    page.reload();

    page.start();
    page.answer('nationalists'); // the first result of the second load
    page.back(); // question
    page.back(); // intro
    page.back(); // the result from before the reload
    expect(page.state).toEqual({ screen: 'intro' });
  });
});

describe('a history the quiz did not write', () => {
  it.each([
    ['text', 'result'],
    ['a made-up result', { quiz: 'result', key: 'guess:1' }],
    ['an unknown screen', { quiz: 'admin' }],
    ['an unrelated object', { page: 2 }],
  ])('opens on the intro when the entry holds %s', (_name, raw) => {
    const history = new FakeHistory();
    history.entries = [raw];
    const page = openPage(history);
    expect(page.state).toEqual({ screen: 'intro' });
    expect(history.state).toEqual({ quiz: 'intro' });
  });
});
