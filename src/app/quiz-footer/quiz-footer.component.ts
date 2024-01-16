import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quiz-app-quiz-footer',
  templateUrl: './quiz-footer.component.html',
  styleUrls: ['./quiz-footer.component.scss'],
})
export class QuizFooterComponent {
  @Input() lastQuestion = false;
  @Input() previousAllowed = false;
  @Output() nextButton = new EventEmitter();
  @Output() skipButton = new EventEmitter();
  @Output() previousButton = new EventEmitter();
  nextQuestion() {
    console.log('Last Question:', this.lastQuestion);
    this.nextButton.emit();
  }
  skipQuestion() {
    this.skipButton.emit();
  }
  previousQuestion() {
    this.previousButton.emit();
  }
}
