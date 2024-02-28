import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, interval, of, throwError } from 'rxjs';
import { QuizEffects } from './quiz.effects';
import { QuizAppService } from 'lib/src/lib/quiz-api-service/quiz-app.service';
import { QuizPageActions, QuizApiActions } from './quizApp.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';
import { mockQuestion } from 'lib/src/lib/quiz-interface/mock-data.interface';
import { Actions } from '@ngrx/effects';

describe('QuizEffects', () => {
  let actions$: any;
  let effects: QuizEffects;
  let quizService: QuizAppService;
  let router: Router;
  let store: MockStore;
  let testScheduler: TestScheduler;
  const routerSpy = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    // actions$ = {
    //   pipe: jest.fn(), // Mock the pipe method
    // };
    actions$ = of(QuizPageActions.startTimer());
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        QuizEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        // { provide: Actions, useValue: actions$ },
        {
          provide: QuizAppService,
          useValue: {
            getTrivia: jest.fn(),
            getCategories: jest.fn(),
          },
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    });

    effects = TestBed.inject(QuizEffects);
    quizService = TestBed.inject(QuizAppService);
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadTrivia$', () => {
    it('should load trivia successfully', fakeAsync(() => {
      const trivia = [mockQuestion];
      const action = QuizPageActions.submitForm({
        formValue: { username: 'testUser' },
      });
      actions$ = of(action);

      jest.spyOn(quizService, 'getTrivia').mockReturnValue(of(trivia));

      const expected = QuizApiActions.triviaLoadedSuccess({ trivia });

      effects.loadTrivia$.subscribe((result) => {
        console.log('load trivia');
        expect(result).toEqual(expected);
      });
      flush();
    }));

    it('should dispatch loadQuizFailure action on failed trivia fetch', fakeAsync(() => {
      const error = new Error('Failed to fetch trivia');
      const action = QuizPageActions.submitForm({
        formValue: { username: 'testUser' },
      });

      actions$ = of(action);
      jest.spyOn(quizService, 'getTrivia').mockReturnValue(throwError(error));

      effects.loadTrivia$.subscribe((resultAction) => {
        expect(resultAction).toEqual(QuizApiActions.loadQuizFailure({ error }));
      });
      flush();
    }));

    it('should handle errors when loading trivia', fakeAsync(() => {
      const error = new Error('Failed to load trivia');
      const action = QuizPageActions.submitForm({
        formValue: { username: 'testUser' },
      });
      actions$ = of(action);

      jest.spyOn(quizService, 'getTrivia').mockReturnValue(throwError(error));

      const expected = QuizApiActions.loadQuizFailure({ error });

      effects.loadTrivia$.subscribe((result) => {
        expect(result).toEqual(expected);
      });
      flush();
    }));
  });

  describe('loadCategories$', () => {
    it('should load categories successfully', fakeAsync(() => {
      const categories = { category1: ['question1', 'question2'] };
      const action = QuizPageActions.loadCategories();
      const state = { categories: {} };
      actions$ = of(action);
      store.setState(state);
      jest.spyOn(quizService, 'getCategories').mockReturnValue(of(categories));
      // quizService.getCategories.and.returnValue(of(categories));

      const expected = QuizApiActions.loadCategoriesSuccess({ categories });

      effects.loadCategories$.subscribe((result) => {
        expect(result).toEqual(expected);
      });
      flush();
    }));

    it('should handle errors when loading categories', fakeAsync(() => {
      const error = new Error('Failed to load categories');
      const action = QuizPageActions.loadCategories();
      const state = { categories: {} };
      actions$ = of(action);
      store.setState(state);
      jest
        .spyOn(quizService, 'getCategories')
        .mockReturnValue(throwError(error));
      // quizService.getCategories.and.returnValue(throwError(error));

      const expected = QuizApiActions.loadCategoriesFailure({ error });

      effects.loadCategories$.subscribe((result) => {
        expect(result).toEqual(expected);
      });
      flush();
    }));

    it('should not load categories if categories are already loaded', fakeAsync(() => {
      const action = QuizPageActions.loadCategories();
      const state = { categories: { category1: ['question1', 'question2'] } };
      actions$ = of(action);
      store.setState(state);

      effects.loadCategories$.subscribe((result) => {
        expect(result).toBeUndefined();
      });
      flush();
    }));
  });

  describe('navigateToResults$', () => {
    it('should navigate to results when finishQuiz action is dispatched', fakeAsync(() => {
      const action = QuizPageActions.finishQuiz();
      actions$ = of(action);

      effects.navigateToResults$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/results']);
      });
      flush();
    }));
  });

  describe('navigateToQuiz$', () => {
    it('should navigate to quizstart when triviaLoadedSuccess action is dispatched', fakeAsync(() => {
      const action = QuizApiActions.triviaLoadedSuccess({ trivia: [] });
      actions$ = of(action);

      effects.navigateToQuiz$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/quizstart']);
      });
      flush();
    }));
  });

  describe('restartQuiz$', () => {
    it('should navigate to the home route when restartQuiz action is dispatched', fakeAsync(() => {
      const action = QuizPageActions.restartQuiz();
      actions$ = of(action);

      effects.restartQuiz$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
      flush();
    }));
  });

  describe('StartTimer$ effect ', () => {
    // it('should emit timerTick action every second until stopTimer action is dispatched', fakeAsync(() => {
    //   const startTimerAction = QuizPageActions.startTimer();
    //   const timerTickAction = QuizPageActions.timerTick();
    //   const stopTimerAction = QuizPageActions.stopTimer();
    //   actions$ = of(startTimerAction);
    //   let count = 0;
    //   effects.startTimer$.subscribe((action) => {
    //     if (count === 3) {
    //       expect(action).toEqual(stopTimerAction); // Verify stopTimer action emitted after 3 seconds
    //     } else {
    //       expect(action).toEqual(timerTickAction); // Verify timerTick action emitted every second
    //     }
    //     console.log(count);
    //     count++;
    //     actions$ = of(stopTimerAction);
    //   });

    //   tick(3000); // Advance time by 3 seconds
    //   flush();
    // }));
  });

  // describe('stopTimer$', () => {
  //   it('should dispatch stopTimer and finishQuiz actions when timerDuration reaches 0', () => {
  //     const spy = jest.spyOn(store, 'pipe').mockReturnValue(of(0));
  //     const dispatchSpy = jest.spyOn(store, 'dispatch');

  //     actions$ = of(QuizPageActions.timerTick());
  //     effects.stopTimer$.subscribe();

  //     expect(spy).toHaveBeenCalled();
  //     expect(dispatchSpy).toHaveBeenCalledWith(QuizPageActions.stopTimer());
  //     expect(dispatchSpy).toHaveBeenCalledWith(QuizPageActions.finishQuiz());
  //   });
  // });
});
