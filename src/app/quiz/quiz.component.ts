import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuizAppService } from 'lib/src/lib/quiz-api-service/quiz-app.service';
import { Categories } from 'lib/src/lib/quiz-interface/categories.interface';
import { Observable, Subscription, map, interval, timer, take } from 'rxjs';
import { TriviaState } from '../+state/quiz-app/quiz.reducer';
import {
  selectCategories,
  selectQuizView,
} from '../+state/quiz-app/quiz.selectors';
import { QuizPageActions } from '../+state/quiz-app/quizApp.actions';

@Component({
  selector: 'quiz-app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  constructor(
    private store: Store<TriviaState>,
    private router: Router,
    private triviaQuizService: QuizAppService
  ) {}
  // quizForm!: FormGroup;
  // quizStarted = false;
  currentQuestionNumber$!: Observable<number | null>;
  isFirstQuestion$!: Observable<boolean>;
  totalQuestions$!: Observable<number>;
  score = 0;
  isOptionSelected = false;
  // currentQuestion = 'Who is the founder of Pakistan';
  // options: string[] = [
  //   'Allama Iqbal',
  //   'Quaid e Azam',
  //   'Imran Khan',
  //   'Sir Syed',
  // ];
  // lastQuestion$!: Observable<boolean>;
  previousAllowed = true;
  answered = false;
  selectedOption: string | undefined;
  quizQuestions = false;
  response!: string;
  quizViewState$!: Observable<any>;
  categories$!: Observable<Categories>;
  timer: Subscription | undefined;
  remainingTime = 0;
  timerInterval: any;
  options$!: Observable<string[]>;
  uiTimer: any;
  startTime: any;
  totalQuestions = 0;
  timerSubscription!: Subscription;
  timerDuration = 0;

  ngOnInit(): void {
    // this.options$ = this.store.pipe(
    //   select(selectCurrentQuestion),
    //   map((question) => question.options)
    // );
    // this.options$ = this.quizViewState$.pipe(
    //   map((quizViewState) => quizViewState.currentQuestion.options)
    // );
    this.categories$ = this.store.select(selectCategories);
    this.quizViewState$ = this.store.select(selectQuizView);
    // this.currentQuestionNumber$ = this.store.select(
    //   selectCurrentQuestionNumber
    // );
    // this.isFirstQuestion$ = this.currentQuestionNumber$.pipe(
    //   map((index) => index === 1)
    // );
    this.isFirstQuestion$ = this.quizViewState$.pipe(
      map((quizViewState) => quizViewState.currentQuestionNumber === 1)
    );

    // this.totalQuestions$ = this.store.select(selectTotalQuestions);

    // this.totalQuestions$.subscribe((totalQuestions: number) => {
    //   this.totalQuestions = totalQuestions;
    //   this.timerDuration = this.calculateTimerDuration();
    //   this.startTimer();
    // });
    this.quizViewState$.subscribe((quizViewState) => {
      if (quizViewState) {
        this.totalQuestions = quizViewState.totalQuestions;
        this.timerDuration = this.calculateTimerDuration();
        this.startTimer();
      }
    });
  }
  calculateTimerDuration(): number {
    return this.totalQuestions * 10;
  }
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
  startTimer(): void {
    setTimeout(() => {
      let timer = this.timerDuration;

      this.timerSubscription = interval(1000).subscribe(() => {
        if (timer >= 0) {
          const minutes = Math.floor(timer / 60);
          const seconds = timer % 60;

          const formattedMinutes = minutes < 10 ? '0' + minutes : '' + minutes;
          const formattedSeconds = seconds < 10 ? '0' + seconds : '' + seconds;

          this.uiTimer = `${formattedMinutes}:${formattedSeconds}`;

          timer--;
        }
        if (timer === 0) {
          this.router.navigate(['/results']);
          this.timerSubscription.unsubscribe();
        }
      });
    }, 1000);
  }
  toggleOptionWindow() {
    this.store.dispatch(QuizPageActions.toggleOptionWindow());
  }
  setCurrentQuestion(currentQuestionNumber: number) {
    this.store.dispatch(
      QuizPageActions.setCurrentQuestion({ currentQuestionNumber })
    );
  }
  openSideWindow() {
    this.store.dispatch(QuizPageActions.openSideWindow());
  }
  closeSideWindow() {
    this.store.dispatch(QuizPageActions.closeSideWindow());
  }
  // startQuiz() {
  //   this.quizStarted = true;

  //   this.store.dispatch(
  //     QuizPageActions.submitForm({ formValue: this.quizForm.value })
  //   );

  //   this.triviaSubscribe();
  //   this.router.navigate(['/quizstart']);
  // }

  triviaSubscribe() {
    this.store.dispatch(QuizPageActions.loadTrivia());
    // const totalTimeInSeconds = this.quizForm.value.totalQuestions * 10; // Calculate total time in seconds
    // this.remainingTime = totalTimeInSeconds; // Set the remaining time initially
    // console.log(this.quizForm.value);
    // // Start the timer
    // this.timerInterval = setInterval(() => {
    //   this.remainingTime--;
    //   if (this.remainingTime <= 0) {
    //     clearInterval(this.timerInterval); // Stop the timer
    //     // this.showFinalScore = true;
    //     this.quizQuestions = false;
    //     this.router.navigate(['/results']);
    //     // this.restartQuiz();
    //     // this.finalScoreMessage = 'Time is up! Quiz ended.';
    //     console.log(this.quizQuestions);
    //     return;
    //   }
    // }, 1000);
    // // console.log(this.quizQuestions);
    // this.quizForm.reset();
  }

  nextQuestion(): void {
    // this.router.navigate(['/results']);
    // this.quizViewState$.subscribe((quizViewState) => {
    //   // const { questionNumber, totalQuestions } = quizViewState;
    //   if (quizViewState.questionNumber <= quizViewState.questions.length) {
    //     console.log(quizViewState.questionNumber);
    //     console.log(quizViewState.totalQuestions);
    //     // this.quizQuestions = false;
    //     // console.log(this.quizQuestions);
    //   } else {
    //     this.router.navigate(['/results']);
    //   }
    // });
    this.store.dispatch(QuizPageActions.nextQuestion());

    this.quizViewState$.pipe().subscribe((quizViewState) => {
      if (quizViewState.questionNumber <= quizViewState.questions.length) {
        this.router.navigate(['/results']);
      } else {
        this.finishQuiz();
      }
    });

    // this.quizViewState$.subscribe((quizViewState) => {
    //   const { questionNumber, totalQuestions } = quizViewState;
    //   if (questionNumber === totalQuestions) {
    //     this.store.dispatch(QuizPageActions.finishQuiz());
    //   } else if (questionNumber < totalQuestions) {
    //     this.store.dispatch(QuizPageActions.nextQuestion());
    //   } else {
    //     this.quizQuestions = false;
    //     this.router.navigate(['/results']);
    //   }
    // });
  }
  finishQuiz() {
    this.store.dispatch(QuizPageActions.finishQuiz());
    // this.router.navigate(['/results']);
  }
  skipQuestion() {
    this.store.dispatch(QuizPageActions.skipQuestion());
  }

  handleOption(guess: string) {
    this.store.dispatch(QuizPageActions.answerQuestion({ guess }));
  }

  // restartQuiz() {
  //   this.quizStarted = false;
  //   this.quizForm.reset();
  //   this.store.dispatch(QuizPageActions.restartQuiz());
  //   this.router.navigate(['/']);
  // }
  previousQuestion() {
    this.store.dispatch(QuizPageActions.previousQuestion());
  }
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
