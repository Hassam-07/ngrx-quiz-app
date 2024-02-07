import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';
import { Observable } from 'rxjs';
import {
  selectQuizView,
  selectTotalQuestions,
} from '../+state/quiz-app/quiz.selectors';
import { QuizPageActions } from '../+state/quiz-app/quizApp.actions';

@Component({
  selector: 'quiz-app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit {
  // currentScore$!: Observable<number>;
  // totalQuestions$!: Observable<number>;
  quizViewState$!: Observable<any>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.quizViewState$ = this.store.select(selectQuizView);
    // this.totalQuestions$ = this.store.pipe(select(selectTotalQuestions));
  }
  restartQuiz() {
    this.store.dispatch(QuizPageActions.restartQuiz());
    this.router.navigate(['/']);
  }
}
