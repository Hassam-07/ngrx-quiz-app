import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';
import { Categories } from 'lib/src/lib/quiz-interface/categories.interface';

export const QuizPageActions = createActionGroup({
  source: 'Quiz',
  events: {
    Enter: emptyProps(),
    'Load Trivia': emptyProps(),
    'Next Question': emptyProps(),
    'Answer Question': props<{ guess: string }>(),
    'Skip Question': emptyProps(),
    'Restart Quiz': emptyProps(),
    'Previous Question': emptyProps(),
    'load Categories': emptyProps(),
    'Open Side Window': emptyProps(),
    'Close Side Window': emptyProps(),
    'Toggle Option Window': emptyProps(),
    'Update Next Button': props<{ nextBtn: string }>(),
    'submit Form': props<{ formValue: any }>(),
    'set Current Question': props<{ currentQuestionNumber: number }>(),
  },
});

export const QuizApiActions = createActionGroup({
  source: 'Quiz/API',
  events: {
    'Trivia Loaded Success': props<{ trivia: Question[] }>(),
    'Load Quiz Failure': props<{ error: any }>(),
    'load Categories Success': props<{ categories: Categories }>(),
    'load Categories Failure': props<{ error: any }>(),
  },
});
