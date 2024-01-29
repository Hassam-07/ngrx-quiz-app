import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';

@Component({
  selector: 'quiz-app-quiz-body',
  templateUrl: './quiz-body.component.html',
  styleUrls: ['./quiz-body.component.scss'],
})
export class QuizBodyComponent {
  @Input() response!: string;
  @Input() currentQuestion = '';
  @Input() questions: Question[] = [];
  @Input() options: string[] = [];
  @Input() correctAnswer!: string;
  @Input() remainingTime = 0;
  // @Input() selectedButton!: boolean;
  @Input() choiceType!: string;
  sideWindowVisible = false;
  @Output() nextButton = new EventEmitter();
  @Output() optionClick = new EventEmitter();
  @Output() questionClicked = new EventEmitter<any>();
  handleOption(event: string) {
    this.optionClick.emit(event);
    console.log(event);
  }

  nextQuestion() {
    this.nextButton.emit();
  }
  setCurrentQuestion(index: number) {
    this.questionClicked.emit(index);
  }
  openSideWindow() {
    this.sideWindowVisible = true;
  }
  closeSideWindow() {
    this.sideWindowVisible = false;
  }
}
