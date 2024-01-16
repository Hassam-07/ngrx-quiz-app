import { createSelector, createFeatureSelector } from '@ngrx/store';
import { QUIZ_FEATURE_KEY, TriviaState } from './quiz.reducer';

// Get the feature state
export const selectTriviaState =
  createFeatureSelector<TriviaState>(QUIZ_FEATURE_KEY);

// Selectors for different parts of the state
export const selectShowFooter = createSelector(
  selectTriviaState,
  (state: TriviaState) => state.showFooter
);

export const selectCurrentQuestionNumber = createSelector(
  selectTriviaState,
  (state: TriviaState) => state.currentQuestionNumber
);

export const selectTotalQuestions = createSelector(
  selectTriviaState,
  (state: TriviaState) => state.totalQuestions
);

export const selectScore = createSelector(
  selectTriviaState,
  (state: TriviaState) => state.score
);

export const selectCurrentQuestion = createSelector(
  selectTriviaState,
  (state: TriviaState) => state.currentQuestion
);

export const selectOptions = createSelector(
  selectTriviaState,
  (state: TriviaState) => state.options
);

// export const selectSelectedButton = createSelector(
//   selectTriviaState,
//   (state: TriviaState) => state.selectedButton
// );

export const selectCorrectAnswer = createSelector(
  selectTriviaState,
  (state: TriviaState) => state.correctAnswer
);

export const selectResponse = createSelector(
  selectTriviaState,
  (state: TriviaState) => state.response
);
