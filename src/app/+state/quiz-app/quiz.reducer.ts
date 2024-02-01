// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as triviaActions from './quiz.actions';
// import { QuizEntity } from './quiz.models';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';
// import { selectOptions } from './quiz.selectors';
import { QuizApiActions, QuizPageActions } from './quizApp.actions';
import { Categories } from 'lib/src/lib/quiz-interface/categories.interface';
import { selectCurrentQuestionNumber } from './quiz.selectors';

export const QUIZ_FEATURE_KEY = 'quiz';

export interface TriviaState {
  questions: Question[];
  currentQuestionNumber: number;
  totalQuestions: number;
  score: number;
  quizQuestions: boolean;
  currentQuestion: string;
  // options: string[];
  // answered: boolean;
  selectedOption: string | undefined;
  // selectedButton: boolean;
  correctAnswer: string;
  response: string;
  // lastQuestion: boolean;
  previousAllowed: boolean;
  userResponses: string[];
  categories: Categories;
  sideWindowVisible: boolean;
  optionWindowVisible: boolean;
  nextBtn: string;
}

export const initialState: TriviaState = {
  questions: [],
  currentQuestionNumber: 1,
  totalQuestions: 1,
  score: 0,
  quizQuestions: true,
  currentQuestion: '',
  // options: [],
  // answered: false,
  selectedOption: undefined,
  // selectedButton: false,
  correctAnswer: '',
  response: '',
  // lastQuestion: false,
  previousAllowed: false,
  userResponses: [],
  categories: {},
  sideWindowVisible: false,
  optionWindowVisible: false,
  nextBtn: 'Next',
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
    lastQuestion: trivia.length === state.totalQuestions,
  })),
  on(QuizPageActions.nextQuestion, (state) => {
    const currentQuestionIndex = state.currentQuestionNumber;
    const nextQuestion = state.questions[currentQuestionIndex];
    const currentResponse = state.userResponses[currentQuestionIndex] || '';
    console.log(nextQuestion);
    // const correctAnswer = nextQuestion.correctAnswer;
    if (state.currentQuestionNumber < state.totalQuestions) {
      // const nextQuestion = state.questions[state.currentQuestionNumber];
      // console.log('Last Question in reducer:', state.lastQuestion);
      let nextBtn = state.nextBtn;
      if (state.currentQuestionNumber === state.totalQuestions - 1) {
        nextBtn = 'Finish';
      }
      // Save the response before moving to the next question
      const updatedUserResponses = [...state.userResponses];
      updatedUserResponses[currentQuestionIndex] = currentResponse;

      return {
        ...state,
        currentQuestionNumber: state.currentQuestionNumber + 1,
        selectedOption: undefined,
        response: currentResponse,
        userResponses: updatedUserResponses,
        // correctAnswer: nextQuestion?.correctAnswer || '',
        nextBtn,
      };
    } else {
      console.log('Setting lastQuestion to true in reducer');
      return {
        ...state,
        quizQuestions: false,
        response: currentResponse,
        // correctAnswer: '',
      };
    }
  }),
  on(QuizPageActions.skipQuestion, (state) => {
    if (state.currentQuestionNumber < state.totalQuestions) {
      // const nextQuestion = state.questions[state.currentQuestionNumber];
      return {
        ...state,
        currentQuestionNumber: state.currentQuestionNumber + 1,
        // currentQuestion: nextQuestion.question.text,
        // options: nextQuestion.incorrectAnswers
        //   .concat(nextQuestion.correctAnswer)
        //   .sort(),
        selectedOption: undefined,
      };
    } else {
      return { ...state, showFooter: false };
    }
  }),
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
        // currentQuestion: previousQuestion.question.text,
        // options: previousQuestion.incorrectAnswers
        //   .concat(previousQuestion.correctAnswer)
        //   .sort(),
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
        // answered: true,
        // selectedButton: true,
        score,
        response: guess,
        correctAnswer,
        userResponses: updatedResponses,
      };
    } else {
      return {
        ...state,
        // selectedButton: false
        response: '',
        userResponses: updatedResponses,
      };
    }
  }),
  on(QuizPageActions.restartQuiz, (state) => ({
    ...state,
    ...initialState,
  })),
  on(QuizApiActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
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
    }
    return state;
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
  on(QuizPageActions.updateNextButton, (state, { nextBtn }) => ({
    ...state,
    nextBtn,
  }))
);
