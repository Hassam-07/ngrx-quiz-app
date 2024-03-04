import {
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, interval, of, throwError } from 'rxjs';
import { QuizEffects } from './quiz.effects';
import { QuizAppService } from 'lib/src/lib/quiz-api-service/quiz-app.service';
import { QuizPageActions, QuizApiActions } from './quizApp.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';
import {
  mockCategories,
  mockQuestion,
} from 'lib/src/lib/quiz-interface/mock-data.interface';
import { Actions } from '@ngrx/effects';
import { Categories } from 'lib/src/lib/quiz-interface/categories.interface';
import { selectTimerDuration } from './quiz.selectors';
import { Store } from '@ngrx/store';

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
    // actions$ = of(QuizPageActions.startTimer());
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        QuizEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [{ selector: selectTimerDuration, value: 0 }],
        }),
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

      // const actionsSpy = jest.spyOn(QuizPageActions, 'submitForm');
      const service = jest
        .spyOn(quizService, 'getTrivia')
        .mockReturnValue(of(trivia));

      const expected = QuizApiActions.triviaLoadedSuccess({ trivia });
      effects.loadTrivia$.subscribe((result) => {
        console.log('load trivia', result);
        expect(result).toEqual(expected);
        expect(result).toEqual(action);
        expect(service).toHaveBeenCalled();
      });
      flush();
    }));

    it('should dispatch loadQuizFailure action on failed trivia fetch', fakeAsync(() => {
      const error = new Error('Failed to fetch trivia');
      const action = QuizPageActions.submitForm({
        formValue: { username: 'testUser' },
      });

      actions$ = of(action);
      const service = jest
        .spyOn(quizService, 'getTrivia')
        .mockReturnValue(throwError(error));

      effects.loadTrivia$.subscribe((resultAction) => {
        expect(resultAction).toEqual(QuizApiActions.loadQuizFailure({ error }));
        expect(service).toHaveBeenCalled();
      });

      // expect(action).toHaveBeenCalled();
      flush();
    }));

    it('should handle errors when loading trivia', fakeAsync(() => {
      const error = new Error('Failed to load trivia');
      const action = QuizPageActions.submitForm({
        formValue: { username: 'testUser' },
      });
      actions$ = of(action);

      const service = jest
        .spyOn(quizService, 'getTrivia')
        .mockReturnValue(throwError(error));

      const expected = QuizApiActions.loadQuizFailure({ error });

      effects.loadTrivia$.subscribe((result) => {
        expect(result).toEqual(expected);
        expect(service).toHaveBeenCalled();
      });
      // expect(action).toHaveBeenCalled();
      flush();
    }));
  });

  describe('loadCategories$ Effect', () => {
    it('should load Categories successfully', fakeAsync(() => {
      const categories = mockCategories;
      const action = QuizPageActions.loadCategories();
      const service = jest
        .spyOn(quizService, 'getCategories')
        .mockReturnValue(of(categories));
      const state = {
        geography: ['countries', 'cities', 'continents'],
        history: ['ancient', 'modern', 'medieval'],
        science: ['biology', 'physics', 'chemistry'],
        sports: ['football', 'basketball', 'tennis'],
        music: ['pop', 'rock', 'jazz'],
      };
      actions$ = of(action);
      store.setState(state);
      const expected = QuizApiActions.loadCategoriesSuccess({ categories });

      effects.loadTrivia$.subscribe((result) => {
        expect(result).toEqual(expected);
        expect(service).toHaveBeenCalled();
      });
      flush();
    }));

    it('should filter when categories are not loaded', fakeAsync(() => {
      const action = QuizPageActions.loadCategories();
      const state = { quiz: { categories: {} } };
      actions$ = of(action);
      store.setState(state);

      const expected = QuizApiActions.loadCategoriesSuccess({
        categories: {
          geography: ['countries', 'cities', 'continents'],
          history: ['ancient', 'modern', 'medieval'],
          science: ['biology', 'physics', 'chemistry'],
          sports: ['football', 'basketball', 'tennis'],
          music: ['pop', 'rock', 'jazz'],
        },
      });

      jest
        .spyOn(quizService, 'getCategories')
        .mockReturnValue(of(expected.categories));

      effects.loadCategories$.subscribe((result) => {
        expect(result).toEqual(expected);
      });
      flush();
    }));

    it('should not load categories if categories are already loaded', fakeAsync(() => {
      const action = QuizPageActions.loadCategories();

      const stateWithCategories = {
        quiz: {
          categories: {
            geography: ['countries', 'cities', 'continents'],
            history: ['ancient', 'modern', 'medieval'],
            science: ['biology', 'physics', 'chemistry'],
            sports: ['football', 'basketball', 'tennis'],
            music: ['pop', 'rock', 'jazz'],
          },
        },
      };
      actions$ = of(action);
      store.setState(stateWithCategories);

      effects.loadCategories$.subscribe((result) => {
        expect(result).toBeUndefined();
        expect(quizService.getCategories).not.toHaveBeenCalled();
      });
      flush();
    }));
    it('should handle errors when loading categories', fakeAsync(() => {
      const error = new Error('Failed to load categories');
      const action = QuizPageActions.loadCategories();
      const state = { quiz: { categories: {} } };
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
  });

  describe('navigateToResults$', () => {
    it('should navigate to results when finishQuiz action is dispatched', fakeAsync(() => {
      const action = QuizPageActions.finishQuiz();
      actions$ = of(action);

      effects.navigateToResults$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/results']);
      });
      // expect(action).toHaveBeenCalled();
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
      // expect(action).toHaveBeenCalled();
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
      // expect(action).toHaveBeenCalled();
      flush();
    }));
  });

  describe('StartTimer$ effect ', () => {
    it('should emit timerTick action every second until stopTimer action is dispatched', fakeAsync(() => {
      const startTimerAction = QuizPageActions.startTimer();
      const timerTickAction = QuizPageActions.timerTick();
      const stopTimerAction = QuizPageActions.stopTimer();
      const action = jest.spyOn(QuizPageActions, 'timerTick');
      actions$ = of(startTimerAction);
      // let count = 0;
      effects.startTimer$.subscribe((action) => {
        // expect(action).toEqual(stopTimerAction);
        console.log('start timer subsribe');
        // } else {
      });
      tick(1000);
      expect(action).toHaveBeenCalled(); // Verify timerTick action emitted every second
      actions$ = of(stopTimerAction);
      flush();
      discardPeriodicTasks();
    }));
  });

  describe('stopTimer$', () => {
    // it('should dispatch stopTimer and finishQuiz actions when timer duration reaches 0', () => {
    //   // Mocking timer duration as 0
    //   store.overrideSelector(selectTimerDuration, 0);
    //   const mockTimerDuration = 0;
    //   const storeMock = jest
    //     .spyOn(store, 'pipe')
    //     .mockReturnValue(of(mockTimerDuration));
    //   // Creating a spy on store.dispatch to check if expected actions are dispatched
    //   const dispatchSpy = jest.spyOn(store, 'dispatch');

    //   // Dispatching a timerTick action
    //   actions$ = of(QuizPageActions.timerTick());

    //   // Subscribing to the effect
    //   effects.stopTimer$.subscribe();

    //   // Expecting the stopTimer and finishQuiz actions to be dispatched
    //   expect(dispatchSpy).toHaveBeenCalledWith(QuizPageActions.stopTimer());
    //   expect(dispatchSpy).toHaveBeenCalledWith(QuizPageActions.finishQuiz());
    // });

    // it('should not dispatch any actions when timer duration is not 0', () => {
    //   // Mocking timer duration as non-zero
    //   store.overrideSelector(selectTimerDuration, 10);

    //   // Creating a spy on store.dispatch to check if any action is dispatched
    //   const dispatchSpy = jest.spyOn(store, 'dispatch');

    //   // Dispatching a timerTick action
    //   actions$ = of(QuizPageActions.timerTick());

    //   // Subscribing to the effect
    //   effects.stopTimer$.subscribe();

    //   // Expecting no action to be dispatched
    //   expect(dispatchSpy).not.toHaveBeenCalled();
    // });

    it('should dispatch stopTimer and finishQuiz actions when timerDuration is 0', fakeAsync(() => {
      const mockTimerDuration = 0;

      actions$ = of(QuizPageActions.timerTick());
      const storeMock = jest
        .spyOn(store, 'pipe')
        .mockReturnValue(of(mockTimerDuration));
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      effects.stopTimer$.subscribe();
      tick();
      expect(storeMock).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledWith(QuizPageActions.stopTimer());
      expect(dispatchSpy).toHaveBeenCalledWith(QuizPageActions.finishQuiz());
      flush();
      discardPeriodicTasks();
    }));
    it('should not dispatch any action when timerDuration is not 0', fakeAsync(() => {
      const mockTimerDuration = 10;

      actions$ = of(QuizPageActions.timerTick());
      const storeMock = jest
        .spyOn(store, 'pipe')
        .mockReturnValue(of(mockTimerDuration));
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      effects.stopTimer$.subscribe();

      tick();

      expect(storeMock).toHaveBeenCalled();
      expect(dispatchSpy).not.toHaveBeenCalledWith(QuizPageActions.stopTimer());
      expect(dispatchSpy).not.toHaveBeenCalledWith(
        QuizPageActions.finishQuiz()
      );
      flush();
    }));
    it('should select timer duration from the store using concatLatestFrom', fakeAsync(() => {
      const mockTimerDuration = 5;
      actions$ = of(QuizPageActions.timerTick());

      const selectSpy = jest
        .spyOn(store, 'pipe')
        .mockReturnValue(of(mockTimerDuration));
      effects.stopTimer$.subscribe();

      tick();

      expect(selectSpy).toHaveBeenCalledWith(selectTimerDuration);
    }));
  });
});
