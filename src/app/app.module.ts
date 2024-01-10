import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizHeadComponent } from './quiz-head/quiz-head.component';
import { QuizBodyComponent } from './quiz-body/quiz-body.component';
import { QuizFooterComponent } from './quiz-footer/quiz-footer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromQuiz from './+state/quiz-app/quiz.reducer';
import { quizReducer } from './+state/quiz-app/quiz.reducer';
import { QuizEffects } from './+state/quiz-app/quiz.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    QuizHeadComponent,
    QuizBodyComponent,
    QuizFooterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule,
    StoreModule.forRoot({ quiz: quizReducer }),
    StoreModule.forFeature(fromQuiz.QUIZ_FEATURE_KEY, fromQuiz.quizReducer),
    // EffectsModule.forFeature([QuizEffects]),
    EffectsModule.forRoot([QuizEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
