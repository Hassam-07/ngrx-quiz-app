import { Action } from '@ngrx/store';

import * as QuizActions from './quiz.actions';
import { QuizEntity } from './quiz.models';
import { QuizState, initialQuizState, quizReducer } from './quiz.reducer';

describe('Quiz Reducer', () => {
  const createQuizEntity = (id: string, name = ''): QuizEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Quiz actions', () => {
    it('loadQuizSuccess should return the list of known Quiz', () => {
      const quiz = [
        createQuizEntity('PRODUCT-AAA'),
        createQuizEntity('PRODUCT-zzz'),
      ];
      const action = QuizActions.loadQuizSuccess({ quiz });

      const result: QuizState = quizReducer(initialQuizState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = quizReducer(initialQuizState, action);

      expect(result).toBe(initialQuizState);
    });
  });
});
