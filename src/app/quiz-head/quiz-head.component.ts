import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quiz-app-quiz-head',
  templateUrl: './quiz-head.component.html',
  styleUrls: ['./quiz-head.component.scss'],
})
export class QuizHeadComponent {
  @Input() currentQuestionNumber = 1;
  @Input() totalQuestions!: number;
  @Input() score!: number;
  @Input() remainingTime = 0;
  @Input() isFirstQuestion!: boolean;
  @Output() nextButton = new EventEmitter();
  @Output() optionWindow = new EventEmitter();
  @Output() skipButton = new EventEmitter();
  @Output() previousButton = new EventEmitter();

  optionWindowVisible = false;
  toggleOptionWindow() {
    this.optionWindow.emit();
    // this.optionWindowVisible = !this.optionWindowVisible;
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
