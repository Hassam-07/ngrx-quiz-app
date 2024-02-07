import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizHeadComponent } from './quiz-head/quiz-head.component';
import { QuizBodyComponent } from './quiz-body/quiz-body.component';
import { QuizFooterComponent } from './quiz-footer/quiz-footer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as trivia from './+state/quiz-app/quiz.reducer';
import { quizReducer } from './+state/quiz-app/quiz.reducer';
import { QuizEffects } from './+state/quiz-app/quiz.effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { TimeFormatPipe } from './time-format.pipe';
import { UserLoginComponent } from './user-login/user-login.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizHeadComponent,
    QuizBodyComponent,
    QuizFooterComponent,
    QuizResultComponent,
    TimeFormatPipe,
    UserLoginComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    StoreModule.forFeature(trivia.QUIZ_FEATURE_KEY, trivia.quizReducer),
    EffectsModule.forFeature([QuizEffects]),
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
