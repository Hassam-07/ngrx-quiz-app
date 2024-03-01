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
export const selectFirstQuestion = createSelector(
  selectTriviaState,
  (state) => state.currentQuestionNumber === 1
);

export const selectCurrentQuestion = createSelector(
  selectQuestions,
  selectCurrentQuestionNumber,
  (questions, currentQuestionNumber) => {
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
    return state.response;
  }
);
export const selectUserResponses = createSelector(
  selectTriviaState,
  (state) => {
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
export const selectMessage = createSelector(selectPercentageQuiz, (percentage) => {
  if (percentage === 100) {
    return 'Excellent Job!😊👌';
  } else if (percentage >= 80) {
    return 'Good, keep it up!👌';
  } else if (percentage >= 50) {
    return 'Keep it up👌';
  } else if (percentage >= 30) {
    return 'Ohhh!, Prepare for the next time👍';
  } else {
    return 'You have failed the quiz!😒. better luck next time!👍';
  }
});

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
  selectFirstQuestion,
  selectMessage,
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
    percentage,
    FirstQuestion,
    message,
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
    FirstQuestion,
    message,
  })
);


