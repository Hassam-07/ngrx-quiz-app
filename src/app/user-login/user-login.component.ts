import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Categories } from 'lib/src/lib/quiz-interface/categories.interface';
import { Observable } from 'rxjs';
import { selectCategories } from '../+state/quiz-app/quiz.selectors';
import { QuizPageActions } from '../+state/quiz-app/quizApp.actions';

@Component({
  selector: 'quiz-app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  quizForm!: FormGroup;
  categories$!: Observable<Categories>;
  totalQuestions$!: Observable<number>;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(QuizPageActions.loadCategories());
    this.categories$ = this.store.select(selectCategories);
    this.quizForm = new FormGroup({
      username: new FormControl(''),
      categories: new FormControl([]),
      difficulties: new FormControl(''),
      totalQuestions: new FormControl(5),
      type: new FormControl(''),
    });
  }

  startQuiz() {
    this.store.dispatch(
      QuizPageActions.submitForm({ formValue: this.quizForm.value })
    );
    this.quizForm.reset();
  }
}
