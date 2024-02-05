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

import { Observable, Subscription, map, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TriviaState } from './+state/quiz-app/quiz.reducer';
import {
  selectCategories,
  selectCorrectAnswer,
  selectCurrentQuestion,
  selectCurrentQuestionNumber,
  selectOptionWindowVisible,
  selectQuestions,
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
export class AppComponent implements OnInit {
  // constructor(private triviaQuizService: QuizAppService) {}
  constructor(
    private store: Store<TriviaState>,
    private router: Router,
    private triviaQuizService: QuizAppService
  ) {}
  quizForm!: FormGroup;
  quizStarted = false;
  // currentQuestionNumber!: number;
  currentQuestionNumber$!: Observable<number | null>;
  isFirstQuestion$!: Observable<boolean>;
  // totalQuestions!: number;
  totalQuestions$!: Observable<number>;
  score = 0;
  isOptionSelected = false;
  currentQuestion = 'Who is the founder of Pakistan';
  options: string[] = [
    'Allama Iqbal',
    'Quaid e Azam',
    'Imran Khan',
    'Sir Syed',
  ];
  lastQuestion$!: Observable<boolean>;
  previousAllowed = true;
  answered = false;
  selectedOption: string | undefined;
  quizQuestions = true;
  // questions!: Question[];
  questions$!: Observable<Question[]>;
  finalScoreMessage: string | null = null;
  showFinalScore = false;
  selectedButton = false;
  // correctAnswer!: string;
  correctAnswer$!: Observable<string>;
  imgOptions: any[] = [];
  choice: any;
  types!: string;
  response!: string;
  triviaState$!: Observable<TriviaState>;
  categories$!: Observable<Categories>;
  selectCurrentQuestion$!: Observable<Question>;
  timer: Subscription | undefined;
  remainingTime = 0;
  timerInterval: any;
  // selectCurrentQuestionNumber$!: Observable<number>;
  // nextBtn = 'Next';
  nextBtn$!: Observable<string>;
  // optionWindowVisible = false;
  // sideWindowVisible = false;
  sideWindowVisible$!: Observable<boolean>;
  optionWindowVisible$!: Observable<boolean>;
  options$!: Observable<string[]>;

  ngOnInit(): void {
    this.sideWindowVisible$ = this.store.select(selectSideWindowVisible);
    this.correctAnswer$ = this.store.select(selectCorrectAnswer);
    this.totalQuestions$ = this.store.select(selectTotalQuestions);
    this.options$ = this.store.pipe(
      select(selectCurrentQuestion),
      map((question) => question.options)
    );
    // this.selectCurrentQuestionNumber$ = this.store.select(
    //   selectCurrentQuestionNumber
    // );
    this.optionWindowVisible$ = this.store.select(selectOptionWindowVisible);
    this.categories$ = this.store.select(selectCategories);
    this.questions$ = this.store.pipe(select(selectQuestions));
    this.selectCurrentQuestion$ = this.store.pipe(
      select(selectCurrentQuestion)
    );
    this.triviaState$ = this.store.select(selectTriviaState);
    this.currentQuestionNumber$ = this.store.pipe(
      select(selectCurrentQuestionNumber)
    );
    // this.lastQuestion$ = this.store.select('lastQuestion');
    this.quizForm = new FormGroup({
      username: new FormControl(''),
      categories: new FormControl([]),
      difficulties: new FormControl(''),
      totalQuestions: new FormControl(5),
      type: new FormControl(''),
    });
    this.store.dispatch(QuizPageActions.loadCategories());
    // this.currentQuestionNumber$.subscribe((index) => {
    //   if (index && index === this.totalQuestions) {
    //     this.nextBtn = 'Complete';
    //   }
    // });
    this.isFirstQuestion$ = this.currentQuestionNumber$.pipe(
      map((index) => index === 1)
    );
  }
  toggleOptionWindow() {
    this.store.dispatch(QuizPageActions.toggleOptionWindow());
  }
  // updateNextBtn(nextBtn: string): void {
  //   this.store.dispatch(QuizPageActions.updateNextButton({ nextBtn }));
  // }

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
  startQuiz() {
    this.quizStarted = true;

    this.store.dispatch(
      QuizPageActions.submitForm({ formValue: this.quizForm.value })
    );

    this.triviaSubscribe();
  }

  triviaSubscribe() {
    this.store.dispatch(QuizPageActions.loadTrivia());
    const totalTimeInSeconds = this.quizForm.value.totalQuestions * 10; // Calculate total time in seconds
    this.remainingTime = totalTimeInSeconds; // Set the remaining time initially
    console.log(this.quizForm.value);
    // Start the timer
    this.timerInterval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.timerInterval); // Stop the timer
        // this.showFinalScore = true;
        this.quizQuestions = false;
        // this.finalScoreMessage = 'Time is up! Quiz ended.';
        console.log(this.quizQuestions);
        return;
      }
    }, 1000);
    console.log(this.quizQuestions);
    this.quizForm.reset();
  }

  nextQuestion(): void {
    this.store.dispatch(QuizPageActions.nextQuestion());
  }

  skipQuestion() {
    this.store.dispatch(QuizPageActions.skipQuestion());
  }

  handleOption(guess: string) {
    this.store.dispatch(QuizPageActions.answerQuestion({ guess }));
  }

  // Restart quiz method
  restartQuiz() {
    this.triviaSubscribe();
    this.store.dispatch(QuizPageActions.restartQuiz());
  }
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
