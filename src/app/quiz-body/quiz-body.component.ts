import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';

@Component({
  selector: 'quiz-app-quiz-body',
  templateUrl: './quiz-body.component.html',
  styleUrls: ['./quiz-body.component.scss'],
})
export class QuizBodyComponent {
  @Input() userResponses!: string[];
  @Input() currentQuestion = '';
  @Input() questions: Question[] = [];
  @Input() options: string[] = [];
  @Input() correctAnswer!: string;
  @Input() remainingTime = 0;
  @Input() choiceType!: string;
  @Input() sideWindowVisible!: boolean;
  @Output() openSideNav = new EventEmitter();
  @Output() closeSideNav = new EventEmitter();
  @Output() questionClicked = new EventEmitter<any>();

  setCurrentQuestion(index: number) {
    this.questionClicked.emit(index);
  }
  openSideWindow() {
    this.openSideNav.emit();
  }
  closeSideWindow() {
    this.closeSideNav.emit();
  }
}
