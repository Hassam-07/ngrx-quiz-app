import { createReducer, on } from '@ngrx/store';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';
import { QuizApiActions, QuizPageActions } from './quizApp.actions';
import { Categories } from 'lib/src/lib/quiz-interface/categories.interface';

export const QUIZ_FEATURE_KEY = 'quiz';

export interface TriviaState {
  username: string;
  questions: Question[];
  currentQuestionNumber: number;
  score: number;
  quizQuestions: boolean;
  currentQuestion: string;
  selectedOption: string | undefined;
  response: string;
  previousAllowed: boolean;
  userResponses: string[];
  categories: Categories;
  sideWindowVisible: boolean;
  optionWindowVisible: boolean;
  timerDuration: number;
  options: string[];
}

export const initialState: TriviaState = {
  username: '',
  questions: [],
  currentQuestionNumber: 1,
  score: 0,
  quizQuestions: true,
  currentQuestion: '',
  selectedOption: undefined,
  response: '',
  previousAllowed: false,
  userResponses: [],
  categories: {},
  sideWindowVisible: false,
  optionWindowVisible: false,
  timerDuration: 0,
  options: [],
};

export const quizReducer = createReducer(
  initialState,
  on(QuizApiActions.triviaLoadedSuccess, (state, { trivia }) => ({
    ...state,
    questions: trivia,
    totalQuestions: trivia.length,
    currentQuestion: trivia[state.currentQuestionNumber - 1].question.text,
    options: trivia[state.currentQuestionNumber - 1].incorrectAnswers
      .concat(trivia[state.currentQuestionNumber - 1].correctAnswer)
      .sort(),
    timerDuration: trivia.length * 10,
  })),
  on(QuizPageActions.nextQuestion, (state) => {
    const currentQuestionIndex = state.currentQuestionNumber;
    const nextQuestion = state.questions[currentQuestionIndex];
    const currentResponse = state.userResponses[currentQuestionIndex] || '';
    console.log(nextQuestion);
    if (state.currentQuestionNumber < state.questions.length) {
      const updatedUserResponses = [...state.userResponses];
      updatedUserResponses[currentQuestionIndex] = currentResponse;

      return {
        ...state,
        currentQuestionNumber: state.currentQuestionNumber + 1,
        selectedOption: undefined,
        response: currentResponse,
        userResponses: updatedUserResponses,
      };
    } else {
      console.log('Setting lastQuestion to true in reducer');
      return {
        ...state,
        response: currentResponse,
      };
    }
  }),
  // on(QuizPageActions.skipQuestion, (state) => {
  //   if (state.currentQuestionNumber < state.questions.length) {
  //     return {
  //       ...state,
  //       currentQuestionNumber: state.currentQuestionNumber + 1,
  //       selectedOption: undefined,
  //     };
  //   } else {
  //     return { ...state, showFooter: false };
  //   }
  // }),
  on(QuizPageActions.previousQuestion, (state) => {
    if (state.currentQuestionNumber > 1) {
      const previousQuestionIndex = state.currentQuestionNumber - 2;
      const previousQuestion = state.questions[previousQuestionIndex];
      const response = state.userResponses[previousQuestionIndex] || '';
      const correctAnswer = previousQuestion.correctAnswer;
      console.log(previousQuestionIndex);
      return {
        ...state,
        currentQuestionNumber: state.currentQuestionNumber - 1,
        selectedOption: response || undefined,
        response,
        correctAnswer,
      };
    } else {
      console.log('previous allowed');
      return { ...state, previousAllowed: false };
    }
  }),
  on(QuizPageActions.answerQuestion, (state, { guess }) => {
    const correctAnswer =
      state.questions[state.currentQuestionNumber - 1].correctAnswer;
    const updatedResponses = [...state.userResponses];
    updatedResponses[state.currentQuestionNumber - 1] = guess;
    if (!state.response) {
      const score = guess === correctAnswer ? state.score + 1 : state.score;
      return {
        ...state,
        score,
        response: guess,
        correctAnswer,
        userResponses: updatedResponses,
      };
    } else {
      return {
        ...state,
        response: '',
        userResponses: updatedResponses,
      };
    }
  }),
  on(QuizPageActions.restartQuiz, (state) => ({
    ...state,
    username: '',
    questions: [],
    currentQuestionNumber: 1,
    score: 0,
    quizQuestions: true,
    selectedOption: undefined,
    previousAllowed: false,
    userResponses: [],
    timerDuration: 0,
  })),
  on(QuizApiActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
  })),
  on(QuizPageActions.submitForm, (state, { formValue }) => ({
    ...state,
    username: formValue.username,
  })),
  on(QuizPageActions.setCurrentQuestion, (state, { currentQuestionNumber }) => {
    if (
      state.currentQuestionNumber > 0 &&
      state.currentQuestionNumber <= state.questions.length
    ) {
      const currentQuestion = state.questions[state.currentQuestionNumber - 1];
      return {
        ...state,
        currentQuestion: currentQuestion.question.text,
        options: currentQuestion.incorrectAnswers
          .concat(currentQuestion.correctAnswer)
          .sort(),
        currentQuestionNumber: currentQuestionNumber,
      };
    } else {
      return state;
    }
  }),
  on(QuizPageActions.openSideWindow, (state) => ({
    ...state,
    sideWindowVisible: true,
    optionWindowVisible: false,
  })),
  on(QuizPageActions.closeSideWindow, (state) => ({
    ...state,
    sideWindowVisible: false,
  })),
  on(QuizPageActions.toggleOptionWindow, (state) => ({
    ...state,
    optionWindowVisible: !state.optionWindowVisible,
    sideWindowVisible: false,
  })),
  on(QuizPageActions.startTimer, (state) => ({
    ...state,
  })),
  on(QuizPageActions.stopTimer, (state) => ({
    ...state,
    timerDuration: 0,
  })),
  on(QuizPageActions.timerTick, (state) => ({
    ...state,
    timerDuration: state.timerDuration - 1,
  }))
);
