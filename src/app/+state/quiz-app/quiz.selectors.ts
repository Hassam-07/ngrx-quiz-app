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
  (state: TriviaState) => state.questions.length
);
export const selectCategories = createSelector(
  selectTriviaState,
  (state) => state.categories
);

export const selectScore = createSelector(
  selectTriviaState,
  (state: TriviaState) => state.score
);

export const selectQuestions = createSelector(
  selectTriviaState,
  (state) => state.questions
);

export const selectCurrentQuestion = createSelector(
  selectQuestions,
  selectCurrentQuestionNumber,
  (questions, currentQuestionNumber) => {
    console.log('hi', questions);
    console.log('currentQuestionNumber:', currentQuestionNumber);
    const adjustedIndex = currentQuestionNumber - 1;

    return {
      ...questions[adjustedIndex],
      options:
        questions[adjustedIndex]?.incorrectAnswers
          .concat(questions[adjustedIndex]?.correctAnswer)
          .sort() || [],
    };
  }
);

export const selectCorrectAnswer = createSelector(
  selectCurrentQuestion,
  (currentQuestion) => currentQuestion?.correctAnswer
);

export const selectSelectedOption = createSelector(
  selectTriviaState,
  (state) => {
    console.log('selected', state.response);
    return state.response;
  }
);
export const selectUserResponses = createSelector(
  selectTriviaState,
  (state) => {
    console.log('Responses saved as', state.userResponses);
    return state.userResponses;
  }
);
