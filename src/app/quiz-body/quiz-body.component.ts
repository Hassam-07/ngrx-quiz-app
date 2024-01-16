import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quiz-app-quiz-body',
  templateUrl: './quiz-body.component.html',
  styleUrls: ['./quiz-body.component.scss'],
})
export class QuizBodyComponent {
  @Input() response!: string;
  @Input() currentQuestion = '';
  @Input() options: string[] = [];
  @Input() correctAnswer!: string;
  @Input() remainingTime = 0;
  // @Input() selectedButton!: boolean;
  @Input() choiceType!: string;

  @Output() nextButton = new EventEmitter();
  @Output() optionClick = new EventEmitter();
  handleOption(event: string) {
    this.optionClick.emit(event);
    console.log(event);
  }

  nextQuestion() {
    this.nextButton.emit();
  }
}
