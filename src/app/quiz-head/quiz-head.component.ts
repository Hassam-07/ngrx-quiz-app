import { Component, Input } from '@angular/core';

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
}
