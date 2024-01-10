import { createAction, props } from '@ngrx/store';
import { QuizEntity } from './quiz.models';

export const initQuiz = createAction('[Quiz Page] Init');

export const loadQuizSuccess = createAction(
  '[Quiz/API] Load Quiz Success',
  props<{ quiz: QuizEntity[] }>()
);

export const loadQuizFailure = createAction(
  '[Quiz/API] Load Quiz Failure',
  props<{ error: string }>()
);
