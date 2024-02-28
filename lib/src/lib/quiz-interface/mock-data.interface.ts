import { Question } from './quizApp.models';
import { Categories } from './categories.interface';

export const mockQuestion: Question = {
  id: '1',
  correctAnswer: 'A',
  incorrectAnswers: ['B', 'C', 'D'],
  question: {
    text: 'What is the capital of France?',
  },
  tags: ['geography', 'capital', 'France'],
  type: 'multiple_choice',
  difficulty: 'medium',
  regions: ['Europe'],
  isNiche: false,
  userResponses: [], // Initialize userResponses array
};

export const mockCategories: Categories = {
  geography: ['countries', 'cities', 'continents'],
  history: ['ancient', 'modern', 'medieval'],
  science: ['biology', 'physics', 'chemistry'],
  sports: ['football', 'basketball', 'tennis'],
  music: ['pop', 'rock', 'jazz'],
};
