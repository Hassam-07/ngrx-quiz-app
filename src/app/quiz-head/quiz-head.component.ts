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
  @Input() timerInterval: any;
  @Input() uiTimer!: string;
  @Input() isFirstQuestion!: boolean | null;
  @Output() nextButton = new EventEmitter();
  @Output() optionWindow = new EventEmitter();
  @Output() skipButton = new EventEmitter();
  @Output() previousButton = new EventEmitter();

  @Input() optionWindowVisible!: boolean;
  toggleOptionWindow() {
    this.optionWindow.emit();
  }
  nextQuestion() {
    this.nextButton.emit();
  }
  skipQuestion() {
    this.skipButton.emit();
  }
  previousQuestion() {
    this.previousButton.emit();
  }
}
