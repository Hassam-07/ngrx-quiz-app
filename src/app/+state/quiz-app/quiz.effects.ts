import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, EMPTY, map, mergeMap } from 'rxjs';

// import * as QuizFeature from './quiz.reducer';
import { QuizAppService } from 'lib/src/lib/quiz-api-service/quiz-app.service';
import { QuizApiActions, QuizPageActions } from './quizApp.actions';

@Injectable()
export class QuizEffects {
  constructor(private actions$: Actions, private quizService: QuizAppService) {}

  loadTrivia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizPageActions.loadTrivia),
      mergeMap(() =>
        this.quizService.getTrivia().pipe(
          map((trivia) => QuizApiActions.triviaLoadedSuccess({ trivia })),
          catchError((error) => {
            console.error('Error in loadTodos effect:', error);
            return of(QuizApiActions.loadQuizFailure({ error }));
          })
        )
      )
    )
  );
}
