import { createAction, props } from '@ngrx/store';
// import { QuizEntity } from './quiz.models';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';

export const initQuiz = createAction('[Quiz Page] Init');

// export const loadQuizSuccess = createAction(
//   '[Quiz/API] Load Quiz Success',
//   props<{ quiz: QuizEntity[] }>()
// );

// export const loadTrivia = createAction('[Quiz] Load Trivia');
// export const triviaLoaded = createAction(
//   '[Quiz/API] Trivia Loaded Success',
//   props<{ trivia: Question[] }>()
// );
// export const loadQuizFailure = createAction(
//   '[Quiz/API] Load Quiz Failure',
//   props<{ error: string }>()
// );
// export const loadCategories = createAction('[Quiz] Load Categories');
// export const loadCategoriesSuccess = createAction(
//   '[Quiz] Load Categories Success',
//   props<{ categories: string[] }>()
// );
// export const loadCategoriesFailure = createAction(
//   '[Quiz] Load Categories Failure',
//   props<{ error: any }>()
// );

// export const submitForm = createAction(
//   '[Quiz] Submit Form',
//   props<{ formValue: any }>()
// );

// export const answerQuestion = createAction(
//   '[Quiz] Answer Question',
//   props<{ guess: string }>()
// );

// export const nextQuestion = createAction('[Quiz] Next Question');
// export const skipQuestion = createAction('[Quiz] Skip Question');
// export const previousQuestion = createAction('[Quiz] Previous Question');
// export const restartQuiz = createAction('[Quiz] Restart Quiz');
