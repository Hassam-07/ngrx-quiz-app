import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as QuizActions from './quiz.actions';
import { QuizEffects } from './quiz.effects';

describe('QuizEffects', () => {
  let actions: Observable<Action>;
  let effects: QuizEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        QuizEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(QuizEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: QuizActions.initQuiz() });

      const expected = hot('-a-|', {
        a: QuizActions.loadQuizSuccess({ quiz: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
