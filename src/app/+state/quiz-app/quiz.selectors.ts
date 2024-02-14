import { createSelector, createFeatureSelector } from '@ngrx/store';
import { QUIZ_FEATURE_KEY, TriviaState } from './quiz.reducer';
import { QuizPageActions } from './quizApp.actions';

// Get the feature state
export const selectTriviaState =
  createFeatureSelector<TriviaState>(QUIZ_FEATURE_KEY);

// Selectors for different parts of the state
export const selectQuizQuestions = createSelector(
  selectTriviaState,
  (state: TriviaState) => state.quizQuestions
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
// export const selectCategoriesLoaded = createSelector(
//   selectTriviaState,
//   (state) => state.categoriesLoaded
// );
// export const selectCategoriesLoaded = createSelector(
//   selectTriviaState,
//   (state) => Object.keys(state.categories).length > 0
// );

export const selectScore = createSelector(
  selectTriviaState,
  (state: TriviaState) => state.score
);

export const selectQuestions = createSelector(
  selectTriviaState,
  (state) => state.questions
);
export const selectPercentageQuiz = createSelector(
  selectTriviaState,
  (state) => (state.score / state.questions.length) * 100
);

export const selectCurrentQuestion = createSelector(
  selectQuestions,
  selectCurrentQuestionNumber,
  (questions, currentQuestionNumber) => {
    // console.log('hi', questions);
    // console.log('currentQuestionNumber:', currentQuestionNumber);
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

// export const selectUiTimer = createSelector(
//   selectTotalQuestions,
//   (totalQuestions) => {
//     const timerDuration = totalQuestions * 10;
//     const minutes = Math.floor(timerDuration / 60);
//     const seconds = timerDuration % 60;
//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(seconds).padStart(2, '0');
//     return `${formattedMinutes}:${formattedSeconds}`;
//   }
// );
export const selectUsername = createSelector(
  selectTriviaState,
  (state) => state.username
);
export const selectTimerDuration = createSelector(
  selectTriviaState,
  (state) => state.timerDuration
);

export const selectUiTimer = createSelector(
  selectTimerDuration,
  (timerDuration) => {
    // const timerDuration = totalQuestions * 10;
    console.log(timerDuration);
    const minutes = Math.floor(timerDuration / 60);
    const seconds = timerDuration % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }
);

export const selectCorrectAnswer = createSelector(
  selectCurrentQuestion,
  (currentQuestion) => currentQuestion?.correctAnswer
);

export const selectSelectedOption = createSelector(
  selectTriviaState,
  (state) => {
    // console.log('selected', state.response);
    return state.response;
  }
);
export const selectUserResponses = createSelector(
  selectTriviaState,
  (state) => {
    // console.log('Responses saved as', state.userResponses);
    return state.userResponses;
  }
);
export const selectSideWindowVisible = createSelector(
  selectTriviaState,
  (state) => state.sideWindowVisible
);

export const selectOptionWindowVisible = createSelector(
  selectTriviaState,
  (state) => state.optionWindowVisible
);

export const selectQuizView = createSelector(
  selectQuestions,
  selectCurrentQuestion,
  selectScore,
  selectCurrentQuestionNumber,
  selectTotalQuestions,
  selectSideWindowVisible,
  selectOptionWindowVisible,
  selectSelectedOption,
  selectUserResponses,
  selectCorrectAnswer,
  selectQuizQuestions,
  selectUiTimer,
  selectUsername,
  selectPercentageQuiz,
  (
    questions,
    currentQuestion,
    score,
    questionNumber,
    totalQuestions,
    questionPanel,
    answerPanel,
    response,
    userResponses,
    correctAnswer,
    quizQuestions,
    uiTimer,
    username,
    percentage
  ) => ({
    questions,
    currentQuestion,
    score,
    questionNumber,
    totalQuestions,
    questionPanel,
    answerPanel,
    response,
    userResponses,
    correctAnswer,
    quizQuestions,
    uiTimer,
    username,
    percentage,
  })
);
