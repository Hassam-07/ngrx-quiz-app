import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Question } from 'lib/src/lib/quiz-interface/quizApp.models';

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
  },
});

export const QuizApiActions = createActionGroup({
  source: 'Quiz/API',
  events: {
    'Trivia Loaded Success': props<{ trivia: Question[] }>(),
    'Load Quiz Failure': props<{ error: any }>(),
  },
});
