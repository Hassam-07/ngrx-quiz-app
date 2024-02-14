import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';
import { Observable, map } from 'rxjs';
import { selectQuizView } from '../+state/quiz-app/quiz.selectors';
import { QuizPageActions } from '../+state/quiz-app/quizApp.actions';

@Component({
  selector: 'quiz-app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit {
  quizViewState$!: Observable<any>;
  questions: Question[] = [];
  message$!: Observable<string>;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.quizViewState$ = this.store.select(selectQuizView);
    this.message$ = this.quizViewState$.pipe(
      map((quizViewState) => {
        if (quizViewState.percentage === 100) {
          return 'Excellent Job!😊👌';
        } else if (quizViewState.percentage >= 80) {
          return 'Good, keep it up!👌';
        } else if (quizViewState.percentage >= 50) {
          return 'Keep it up👌';
        } else if (quizViewState.percentage >= 30) {
          return 'Ohhh!, Prepare for the next time👍';
        } else {
          return 'You have failed the quiz!😒. better luck next time!👍';
        }
      })
    );
  }
  restartQuiz() {
    this.store.dispatch(QuizPageActions.restartQuiz());
  }
}
