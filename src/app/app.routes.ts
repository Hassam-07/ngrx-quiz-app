import { Route } from '@angular/router';
import { QuizResultComponent } from './quiz-result/quiz-result.component';

export const appRoutes: Route[] = [
  {
    path: 'results',
    component: QuizResultComponent,
  },
];
