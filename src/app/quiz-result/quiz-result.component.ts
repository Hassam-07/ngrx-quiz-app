import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';

@Component({
  selector: 'quiz-app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent {
  @Input() score!: number;
  @Input() totalQuestions!: number;
  @Input() questions: Question[] = [];
  @Output() restartTrivia = new EventEmitter();
  restartQuiz() {
    this.restartTrivia.emit();
  }
}
