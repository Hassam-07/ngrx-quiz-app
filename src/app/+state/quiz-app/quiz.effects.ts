import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, EMPTY, map, mergeMap, tap } from 'rxjs';

// import * as QuizFeature from './quiz.reducer';
import { QuizAppService } from 'lib/src/lib/quiz-api-service/quiz-app.service';
import { QuizApiActions, QuizPageActions } from './quizApp.actions';
// import { Categories } from 'lib/src/lib/quiz-interface/categories.interface';

@Injectable()
export class QuizEffects {
  constructor(private actions$: Actions, private quizService: QuizAppService) {}

  loadTrivia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizPageActions.submitForm),
      mergeMap((action) =>
        this.quizService.getTrivia(action.formValue).pipe(
          tap((data) => {
            console.log('questions:', data);
          }),
          map((trivia) => QuizApiActions.triviaLoadedSuccess({ trivia })),
          catchError((error) => {
            console.error('Error in loadTodos effect:', error);
            return of(QuizApiActions.loadQuizFailure({ error }));
          })
        )
      )
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizPageActions.loadCategories),
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
}
