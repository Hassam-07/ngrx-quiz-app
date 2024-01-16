import { Component, OnInit } from '@angular/core';
// import { QuizAppService } from 'lib/src/lib/quiz-api-service/quiz-app.service';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';
// import * as QuizActions from './+state/quiz-app/quiz.actions';
import { QuizPageActions } from './+state/quiz-app/quizApp.actions';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TriviaState } from './+state/quiz-app/quiz.reducer';
import { selectTriviaState } from './+state/quiz-app/quiz.selectors';
// import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'quiz-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // constructor(private triviaQuizService: QuizAppService) {}
  constructor(private store: Store<TriviaState>) {}

  currentQuestionNumber = 1;
  totalQuestions = 1;
  score = 0;
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

  showFooter = true;
  questions!: Question[];
  finalScoreMessage: string | null = null;
  showFinalScore = false;
  selectedButton = false;
  correctAnswer!: string;

  response!: string;
  triviaState$!: Observable<TriviaState>;

  ngOnInit(): void {
    this.triviaState$ = this.store.select(selectTriviaState);
    this.lastQuestion$ = this.store.select('lastQuestion');
    this.triviaSubscribe();
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

  triviaSubscribe() {
    this.store.dispatch(QuizPageActions.loadTrivia());
  }

  // Replace nextQuestion, skipQuestion, and handleOption methods
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
    if (this.currentQuestionNumber > 1) {
      this.currentQuestionNumber--;
      this.currentQuestion =
        this.questions[this.currentQuestionNumber].question.text;
      console.log(this.currentQuestionNumber);
    }
  }
}
