// Connects the quiz's rules (src/lib/quiz.ts) to the page. All three screens
// are already in the HTML; this file only decides which one is visible.

import { isAnswer, QuizSession, VERDICT, type QuizEvent, type QuizState } from '../lib/quiz';

// How long a newly shown screen ignores presses on its buttons. Long enough to
// swallow the second tap of a double tap, too short for anyone to notice.
const HOLD_MS = 350;

function eventFor(button: HTMLButtonElement): QuizEvent | null {
  const action = button.dataset['quizAction'];
  if (action === 'start' || action === 'restart') return { type: action };
  const answer = button.dataset['quizAnswer'];
  if (action === 'answer' && isAnswer(answer)) return { type: 'answer', answer };
  return null;
}

function startQuiz(root: HTMLElement): void {
  const session = new QuizSession(
    {
      get state(): unknown {
        return history.state;
      },
      pushState: (entry) => history.pushState(entry, ''),
      replaceState: (entry) => history.replaceState(entry, ''),
    },
    crypto.randomUUID(),
  );

  const buttons = [...root.querySelectorAll<HTMLButtonElement>('button[data-quiz-action]')];
  let holdTimer: number | undefined;

  // Without this, a double tap on Start could also press whichever answer
  // appears under the finger, before the visitor has seen the question.
  // `aria-disabled` is used rather than `disabled` so the buttons stay
  // reachable by keyboard during the hold.
  const holdButtons = (): void => {
    for (const button of buttons) button.setAttribute('aria-disabled', 'true');
    window.clearTimeout(holdTimer);
    holdTimer = window.setTimeout(() => {
      for (const button of buttons) button.removeAttribute('aria-disabled');
    }, HOLD_MS);
  };

  /** @param arrived True when the visitor has just moved to this screen. */
  const show = (state: QuizState, arrived: boolean): void => {
    const verdict = state.screen === 'result' ? VERDICT[state.answer] : undefined;
    if (arrived) holdButtons();

    for (const screen of root.querySelectorAll<HTMLElement>('[data-quiz-screen]')) {
      const visible =
        screen.dataset['quizScreen'] === state.screen && screen.dataset['quizVerdict'] === verdict;
      screen.hidden = !visible;
      // The stylesheet animates a screen only when it has just been arrived at.
      screen.toggleAttribute('data-quiz-arrived', visible && arrived);
      // Moving focus to the new screen's heading makes screen readers announce
      // it and lets keyboard users carry on from there.
      if (visible && arrived) screen.querySelector<HTMLElement>('[data-quiz-heading]')?.focus();
    }

    // The whole page changes colour with the verdict (src/styles/global.css).
    if (verdict) document.documentElement.dataset['quizVerdict'] = verdict;
    else delete document.documentElement.dataset['quizVerdict'];
  };

  root.addEventListener('click', (event) => {
    // A second guard for mouse users: the second click of a double-click
    // reports a click count of 2, however slowly it was made.
    if (event.detail > 1) return;

    const button =
      event.target instanceof Element
        ? event.target.closest<HTMLButtonElement>('button[data-quiz-action]')
        : null;
    if (!button || button.getAttribute('aria-disabled') === 'true') return;

    const quizEvent = eventFor(button);
    if (quizEvent && session.dispatch(quizEvent)) show(session.state, true);
  });

  // Back and Forward.
  window.addEventListener('popstate', (event) => {
    session.restore(event.state);
    show(session.state, true);
  });

  // An in-page link such as "Skip to main content" adds an empty history entry.
  window.addEventListener('hashchange', () => session.restamp());

  show(session.state, false);
  for (const button of buttons) button.disabled = false;
  root.dataset['quizReady'] = '';

  // Hover and press transitions are allowed only once the page has been drawn
  // with its real styles; see the note beside them in src/styles/global.css.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      root.dataset['quizSettled'] = '';
    }),
  );
}

const root = document.querySelector<HTMLElement>('[data-quiz]');
if (root) startQuiz(root);
