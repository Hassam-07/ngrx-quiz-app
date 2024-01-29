import { Route } from '@angular/router';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  {
    path: 'results',
    component: QuizResultComponent,
  },
  {
    path: '',
    component: AppComponent,
  },
];
