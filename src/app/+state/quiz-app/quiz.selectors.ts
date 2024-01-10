import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QUIZ_FEATURE_KEY, QuizState, quizAdapter } from './quiz.reducer';

// Lookup the 'Quiz' feature state managed by NgRx
export const selectQuizState =
  createFeatureSelector<QuizState>(QUIZ_FEATURE_KEY);

const { selectAll, selectEntities } = quizAdapter.getSelectors();

export const selectQuizLoaded = createSelector(
  selectQuizState,
  (state: QuizState) => state.loaded
);

export const selectQuizError = createSelector(
  selectQuizState,
  (state: QuizState) => state.error
);

export const selectAllQuiz = createSelector(
  selectQuizState,
  (state: QuizState) => selectAll(state)
);

export const selectQuizEntities = createSelector(
  selectQuizState,
  (state: QuizState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectQuizState,
  (state: QuizState) => state.selectedId
);

export const selectEntity = createSelector(
  selectQuizEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
