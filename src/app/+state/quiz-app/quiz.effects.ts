import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import {
  switchMap,
  catchError,
  of,
  EMPTY,
  map,
  mergeMap,
  tap,
  interval,
  takeUntil,
  filter,
  withLatestFrom,
} from 'rxjs';

// import * as QuizFeature from './quiz.reducer';
import { QuizAppService } from 'lib/src/lib/quiz-api-service/quiz-app.service';
import { QuizApiActions, QuizPageActions } from './quizApp.actions';
import { Router } from '@angular/router';
import { selectCategories, selectTimerDuration } from './quiz.selectors';
import { Store, select } from '@ngrx/store';
// import { Categories } from 'lib/src/lib/quiz-interface/categories.interface';

@Injectable()
export class QuizEffects {
  constructor(
    private actions$: Actions,
    private quizService: QuizAppService,
    private router: Router,
    private store: Store
  ) {}

  loadTrivia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizPageActions.submitForm),
      tap((data) => {
        console.log('submit:', data);
      }),
      mergeMap((action) =>
        this.quizService.getTrivia(action.formValue).pipe(
          tap((data) => {
            console.log('questions:', data);
          }),
          map((trivia) => QuizApiActions.triviaLoadedSuccess({ trivia })),
          catchError((error) => {
            // console.error('Error in loadTodos effect:', error);
            return of(QuizApiActions.loadQuizFailure({ error }));
          })
        )
      )
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizPageActions.loadCategories),
      withLatestFrom(this.store.pipe(select(selectCategories))),
      filter(([_, categories]) => Object.keys(categories).length === 0),
      mergeMap(() =>
        this.quizService.getCategories().pipe(
          map((categories) =>
            QuizApiActions.loadCategoriesSuccess({ categories })
          ),
          catchError((error) =>
            of(QuizApiActions.loadCategoriesFailure({ error }))
          )
        )
      )
    )
  );

  navigateToResults$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(QuizPageActions.finishQuiz),
        tap(() => {
          this.router.navigate(['/results']);
        })
      ),
    { dispatch: false }
  );
  navigateToQuiz$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(QuizApiActions.triviaLoadedSuccess),
        tap(() => {
          this.router.navigate(['/quizstart']);
        })
      ),
    { dispatch: false }
  );

  restartQuiz$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(QuizPageActions.restartQuiz),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  startTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizPageActions.startTimer),
      mergeMap(() =>
        interval(1000).pipe(
          map(() => QuizPageActions.timerTick()),
          takeUntil(this.actions$.pipe(ofType(QuizPageActions.stopTimer)))
        )
      )
    )
  );
  stopTimer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(QuizPageActions.timerTick),
        concatLatestFrom(() => this.store.pipe(select(selectTimerDuration))),
        tap(([action, timerDuration]) => {
          if (timerDuration === 0) {
            this.store.dispatch(QuizPageActions.stopTimer());
            this.store.dispatch(QuizPageActions.finishQuiz());
          }
        })
      ),
    { dispatch: false }
  );

  // stopTimer$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(QuizPageActions.timerTick),
  //       concatLatestFrom(() => this.store.pipe(select(selectTimerDuration))),
  //       switchMap(() =>
  //         this.store.pipe(
  //           tap((timerDuration) => {
  //             if (timerDuration === 0) {
  //               this.store.dispatch(QuizPageActions.stopTimer());
  //               this.store.dispatch(QuizPageActions.finishQuiz());
  //             }
  //           })
  //         )
  //       )
  //     ),
  //   { dispatch: false }
  // );
}
