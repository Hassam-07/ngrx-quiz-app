import { Route } from '@angular/router';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { QuizComponent } from './quiz/quiz.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: UserLoginComponent,
  },
  {
    path: 'quizstart',
    component: QuizComponent,
  },
  {
    path: 'results',
    component: QuizResultComponent,
  },
];
