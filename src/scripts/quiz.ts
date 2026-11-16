// Connects the quiz's rules (src/lib/quiz.ts) to the page. All three screens
// are already in the HTML; this file only decides which one is visible.

import { isAnswer, QuizSession, VERDICT, type QuizEvent, type QuizState } from '../lib/quiz';

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

  const show = (state: QuizState, moveFocus: boolean): void => {
    const verdict = state.screen === 'result' ? VERDICT[state.answer] : undefined;

    for (const screen of root.querySelectorAll<HTMLElement>('[data-quiz-screen]')) {
      const visible =
        screen.dataset['quizScreen'] === state.screen && screen.dataset['quizVerdict'] === verdict;
      screen.hidden = !visible;
      // Moving focus to the new screen's heading makes screen readers announce
      // it and lets keyboard users carry on from there.
      if (visible && moveFocus) screen.querySelector<HTMLElement>('[data-quiz-heading]')?.focus();
    }

    // The whole page changes colour with the verdict (src/styles/global.css).
    if (verdict) document.documentElement.dataset['quizVerdict'] = verdict;
    else delete document.documentElement.dataset['quizVerdict'];
  };

  root.addEventListener('click', (event) => {
    // The second click of a double-click lands on whatever the first click
    // put under the pointer. Ignoring it stops a double-click on Start from
    // also choosing an answer the visitor never saw.
    if (event.detail > 1) return;

    const button =
      event.target instanceof Element
        ? event.target.closest<HTMLButtonElement>('button[data-quiz-action]')
        : null;
    const quizEvent = button ? eventFor(button) : null;
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
  for (const button of root.querySelectorAll<HTMLButtonElement>('button[data-quiz-action]')) {
    button.disabled = false;
  }
  root.dataset['quizReady'] = '';
}

const root = document.querySelector<HTMLElement>('[data-quiz]');
if (root) startQuiz(root);
