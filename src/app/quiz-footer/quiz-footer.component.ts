import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'quiz-app-quiz-footer',
  templateUrl: './quiz-footer.component.html',
  styleUrls: ['./quiz-footer.component.scss'],
})
export class QuizFooterComponent {
  @Output() nextButton = new EventEmitter();
  @Output() skipButton = new EventEmitter();
  nextQuestion() {
    this.nextButton.emit();
  }
  skipQuestion() {
    this.skipButton.emit();
  }
}
