import { Component, OnInit } from '@angular/core';
import { QuizAppService } from './quiz-app.service';
import { Question } from './+state/quiz-app/quiz.models';

@Component({
  selector: 'quiz-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showFooter = true;
  constructor(private triviaQuizService: QuizAppService) {}

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
  answered = false;
  selectedOption: string | undefined;

  questions!: Question[];
  finalScoreMessage: string | null = null;
  showFinalScore = false;
  selectedButton = false;
  correctAnswer!: string;

  response!: string;

  ngOnInit(): void {
    this.triviaSubscribe();
  }
  triviaSubscribe() {
    this.triviaQuizService.getTrivia().subscribe((trivia: Question[]) => {
      console.log(trivia);
      this.questions = trivia;
      this.totalQuestions = this.questions.length;
      this.currentQuestion =
        this.questions[this.currentQuestionNumber - 1].question.text;
      this.options = this.questions[
        this.currentQuestionNumber - 1
      ].incorrectAnswers
        .concat(this.questions[this.currentQuestionNumber - 1].correctAnswer)
        .sort();
    });
    console.log(this.triviaQuizService);
  }

  nextQuestion(): void {
    if (this.currentQuestionNumber < this.totalQuestions) {
      this.currentQuestionNumber++;
      const nextQuestion = this.questions[this.currentQuestionNumber - 1];
      this.currentQuestion = nextQuestion.question.text;
      this.options = nextQuestion.incorrectAnswers
        .concat(nextQuestion.correctAnswer)
        .sort();
      this.selectedOption = undefined;
      this.selectedButton = false;
    } else {
      this.showFooter = false;
    }
  }
  skipQuestion() {
    if (this.currentQuestionNumber < this.totalQuestions) {
      this.currentQuestionNumber++;
      const nextQuestion = this.questions[this.currentQuestionNumber - 1];
      this.currentQuestion = nextQuestion.question.text;
      this.options = nextQuestion.incorrectAnswers
        .concat(nextQuestion.correctAnswer)
        .sort();
      this.selectedOption = undefined;
    } else {
      this.showFooter = false;
    }
  }

  handleOption(guess: string) {
    this.response = guess;

    this.correctAnswer =
      this.questions[this.currentQuestionNumber - 1].correctAnswer;
    if (!this.answered) {
      this.answered = true;
      this.selectedButton = true;
      console.log(this.answered);
      if (
        guess == this.questions[this.currentQuestionNumber - 1].correctAnswer
      ) {
        console.log(true);
        this.score++;
      } else {
        console.log(false);
      }
      // this.answered= false;
      console.log(this.questions[this.currentQuestionNumber - 1].correctAnswer);
    } else {
      this.selectedButton = false;
    }
    this.answered = false;
  }
  restartQuiz() {
    // this.quizStarted = true;
    this.triviaSubscribe();
    this.selectedButton = false;
    this.currentQuestionNumber = 1; // Reset current question number
    this.score = 0; // Reset score
    // this.finalScoreMessage = null;
    // this.showFinalScore = false;
    this.showFooter = true; // Show the footer
  }
}
