/**
 * Interface for the 'Quiz' data
 *
 */
export interface Question {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: {
    text: string;
  };
  tags: string[];
  type: string;
  difficulty: string;
  regions: string[];
  isNiche: boolean;
}
export interface QuizEntity {
  id: string | number; // Primary ID
  name: string;
}
