import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as QuizActions from './quiz.actions';
import { QuizEntity } from './quiz.models';

export const QUIZ_FEATURE_KEY = 'quiz';

export interface QuizState extends EntityState<QuizEntity> {
  selectedId?: string | number; // which Quiz record has been selected
  loaded: boolean; // has the Quiz list been loaded
  error?: string | null; // last known error (if any)
}

export interface QuizPartialState {
  readonly [QUIZ_FEATURE_KEY]: QuizState;
}

export const quizAdapter: EntityAdapter<QuizEntity> =
  createEntityAdapter<QuizEntity>();

export const initialQuizState: QuizState = quizAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialQuizState,
  on(QuizActions.initQuiz, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(QuizActions.loadQuizSuccess, (state, { quiz }) =>
    quizAdapter.setAll(quiz, { ...state, loaded: true })
  ),
  on(QuizActions.loadQuizFailure, (state, { error }) => ({ ...state, error }))
);

export function quizReducer(state: QuizState | undefined, action: Action) {
  return reducer(state, action);
}
