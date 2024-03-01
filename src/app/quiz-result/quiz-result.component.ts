import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';
import { Observable, map } from 'rxjs';
import {
  selectMessage,
  selectQuizView,
} from '../+state/quiz-app/quiz.selectors';
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
    // this.message$ = this.store.select(selectMessage);
  }
  restartQuiz() {
    this.store.dispatch(QuizPageActions.restartQuiz());
  }
}
