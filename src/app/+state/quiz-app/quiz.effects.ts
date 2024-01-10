import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as QuizActions from './quiz.actions';
import * as QuizFeature from './quiz.reducer';

@Injectable()
export class QuizEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.initQuiz),
      switchMap(() => of(QuizActions.loadQuizSuccess({ quiz: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(QuizActions.loadQuizFailure({ error }));
      })
    )
  );
}
