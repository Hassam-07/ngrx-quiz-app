import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
// import { QuizAppService } from 'lib/src/lib/quiz-api-service/quiz-app.service';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';
// import * as QuizActions from './+state/quiz-app/quiz.actions';
import {
  QuizApiActions,
  QuizPageActions,
} from './+state/quiz-app/quizApp.actions';

import { Observable, Subscription, interval, map, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TriviaState } from './+state/quiz-app/quiz.reducer';
import {
  selectCategories,
  selectCorrectAnswer,
  selectCurrentQuestion,
  selectCurrentQuestionNumber,
  selectOptionWindowVisible,
  selectQuestions,
  selectQuizView,
  selectSideWindowVisible,
  selectTotalQuestions,
  selectTriviaState,
} from './+state/quiz-app/quiz.selectors';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizAppService } from 'lib/src/lib/quiz-api-service/quiz-app.service';
import { Categories } from 'lib/src/lib/quiz-interface/categories.interface';
// import { loadCategories, submitForm } from './+state/quiz-app/quiz.actions';
// import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'quiz-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // constructor(
  //   private store: Store<TriviaState>,
  //   private router: Router,
  //   private triviaQuizService: QuizAppService
  // ) {}
  // currentQuestionNumber$!: Observable<number | null>;
  // isFirstQuestion$!: Observable<boolean>;
  // totalQuestions$!: Observable<number>;
  // score = 0;
  // isOptionSelected = false;
  // previousAllowed = true;
  // answered = false;
  // selectedOption: string | undefined;
  // quizQuestions = false;
  // response!: string;
  // quizViewState$!: Observable<any>;
  // categories$!: Observable<Categories>;
  // timer: Subscription | undefined;
  // remainingTime = 0;
  // timerInterval: any;
  // options$!: Observable<string[]>;
  // uiTimer: any;
  // startTime: any;
  // totalQuestions = 0;
  // timerSubscription!: Subscription;
  // timerDuration = 0;
  // ngOnInit(): void {
  //   this.categories$ = this.store.select(selectCategories);
  //   this.quizViewState$ = this.store.select(selectQuizView);
  //   this.isFirstQuestion$ = this.quizViewState$.pipe(
  //     map((quizViewState) => quizViewState.currentQuestionNumber === 1)
  //   );
  //   this.quizViewState$.subscribe((quizViewState) => {
  //     if (quizViewState) {
  //       this.totalQuestions = quizViewState.totalQuestions;
  //       this.timerDuration = this.calculateTimerDuration();
  //       this.startTimer();
  //     }
  //   });
  // }
  // calculateTimerDuration(): number {
  //   return this.totalQuestions * 10;
  // }
  // startTimer(): void {
  //   let timer = this.timerDuration;
  //   this.timerSubscription = interval(1000).subscribe(() => {
  //     if (timer >= 0) {
  //       const minutes = Math.floor(timer / 60);
  //       const seconds = timer % 60;
  //       const formattedMinutes = minutes < 10 ? '0' + minutes : '' + minutes;
  //       const formattedSeconds = seconds < 10 ? '0' + seconds : '' + seconds;
  //       this.uiTimer = `${formattedMinutes}:${formattedSeconds}`;
  //       timer--;
  //     }
  //   });
  // }
  // toggleOptionWindow() {
  //   this.store.dispatch(QuizPageActions.toggleOptionWindow());
  // }
  // setCurrentQuestion(currentQuestionNumber: number) {
  //   this.store.dispatch(
  //     QuizPageActions.setCurrentQuestion({ currentQuestionNumber })
  //   );
  // }
  // openSideWindow() {
  //   this.store.dispatch(QuizPageActions.openSideWindow());
  // }
  // closeSideWindow() {
  //   this.store.dispatch(QuizPageActions.closeSideWindow());
  // }
  // triviaSubscribe() {
  //   this.store.dispatch(QuizPageActions.loadTrivia());
  // }
  // nextQuestion(): void {
  //   this.store.dispatch(QuizPageActions.nextQuestion());
  //   this.quizViewState$.subscribe((quizViewState) => {
  //     const { currentQuestionNumber, totalQuestions } = quizViewState;
  //     if (currentQuestionNumber > totalQuestions) {
  //       this.quizQuestions = false;
  //       this.router.navigate(['/results']);
  //     }
  //   });
  // }
  // skipQuestion() {
  //   this.store.dispatch(QuizPageActions.skipQuestion());
  // }
  // handleOption(guess: string) {
  //   this.store.dispatch(QuizPageActions.answerQuestion({ guess }));
  // }
  // previousQuestion() {
  //   this.store.dispatch(QuizPageActions.previousQuestion());
  // }
}

// triviaSubscribe() {
//   this.triviaQuizService.getTrivia().subscribe((trivia: Question[]) => {
//     console.log(trivia);
//     this.questions = trivia;
//     this.totalQuestions = this.questions.length;
//     this.currentQuestion =
//       this.questions[this.currentQuestionNumber - 1].question.text;
//     this.options = this.questions[
//       this.currentQuestionNumber - 1
//     ].incorrectAnswers
//       .concat(this.questions[this.currentQuestionNumber - 1].correctAnswer)
//       .sort();
//   });
//   console.log(this.triviaQuizService);
// }

// nextQuestion(): void {
//   if (this.currentQuestionNumber < this.totalQuestions) {
//     this.currentQuestionNumber++;
//     const nextQuestion = this.questions[this.currentQuestionNumber - 1];
//     this.currentQuestion = nextQuestion.question.text;
//     this.options = nextQuestion.incorrectAnswers
//       .concat(nextQuestion.correctAnswer)
//       .sort();
//     this.selectedOption = undefined;
//     this.selectedButton = false;
//   } else {
//     this.showFooter = false;
//   }
// }
// skipQuestion() {
//   if (this.currentQuestionNumber < this.totalQuestions) {
//     this.currentQuestionNumber++;
//     const nextQuestion = this.questions[this.currentQuestionNumber - 1];
//     this.currentQuestion = nextQuestion.question.text;
//     this.options = nextQuestion.incorrectAnswers
//       .concat(nextQuestion.correctAnswer)
//       .sort();
//     this.selectedOption = undefined;
//   } else {
//     this.showFooter = false;
//   }
// }

// handleOption(guess: string) {
//   this.response = guess;

//   this.correctAnswer =
//     this.questions[this.currentQuestionNumber - 1].correctAnswer;
//   if (!this.answered) {
//     this.answered = true;
//     this.selectedButton = true;
//     console.log(this.answered);
//     if (
//       guess == this.questions[this.currentQuestionNumber - 1].correctAnswer
//     ) {
//       console.log(true);
//       this.score++;
//     } else {
//       console.log(false);
//     }
//     // this.answered= false;
//     console.log(this.questions[this.currentQuestionNumber - 1].correctAnswer);
//   } else {
//     this.selectedButton = false;
//   }
//   this.answered = false;
// }
// restartQuiz() {
//   this.triviaSubscribe();
//   this.selectedButton = false;
//   this.currentQuestionNumber = 1; // Reset current question number
//   this.score = 0; // Reset score
//   this.showFooter = true;
// }
