import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';

@Component({
  selector: 'quiz-app-quiz-footer',
  templateUrl: './quiz-footer.component.html',
  styleUrls: ['./quiz-footer.component.scss'],
})
export class QuizFooterComponent {
  // @Input() lastQuestion = false;
  // @Input() previousAllowed = false;
  @Input() currentQuestionNumber = 1;
  @Input() totalQuestions!: number;
  @Input() options: string[] = [];
  @Input() response!: string;
  // @Input() nextBtn!: string;
  @Input() questions: Question[] = [];
  @Input() correctAnswer!: string;
  @Output() skipButton = new EventEmitter();
  @Output() nextButton = new EventEmitter();
  @Output() previousButton = new EventEmitter();
  @Input() isFirstQuestion!: boolean | null;
  @Input() isOptionSelected!: boolean;
  @Output() optionClick = new EventEmitter();
  // nextBtn = 'Next';
  // isOptionSelected = false;
  handleOption(event: string) {
    this.optionClick.emit(event);
    console.log(event);
  }
  nextQuestion() {
    // console.log('Last Question:', this.lastQuestion);
    this.nextButton.emit();
  }
  skipQuestion() {
    this.skipButton.emit();
  }
  previousQuestion() {
    this.previousButton.emit();
  }
}
