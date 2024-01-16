import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quiz-app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent {
  @Input() score!: number;
  @Input() totalQuestions!: number;
  @Output() restartTrivia = new EventEmitter();
  restartQuiz() {
    this.restartTrivia.emit();
  }
}
