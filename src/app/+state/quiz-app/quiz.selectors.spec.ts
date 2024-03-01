import { QuizEntity } from './quiz.models';
import { TriviaState, initialState } from './quiz.reducer';

import {
  selectQuestions,
  selectCurrentQuestion,
  selectScore,
  selectCurrentQuestionNumber,
  selectTotalQuestions,
  selectSideWindowVisible,
  selectOptionWindowVisible,
  selectSelectedOption,
  selectUserResponses,
  selectCorrectAnswer,
  selectQuizQuestions,
  selectCategories,
  selectUiTimer,
  selectUsername,
  selectPercentageQuiz,
  selectMessage,
  selectFirstQuestion,
} from './quiz.selectors';

const mockState: TriviaState = {
  username: 'user',
  questions: [
    {
      id: '1',
      correctAnswer: 'A',
      incorrectAnswers: ['B', 'C', 'D'],
      question: { text: 'Question 1' },
      tags: [],
      type: '',
      difficulty: '',
      regions: [],
      isNiche: false,
      userResponses: [],
    },
    {
      id: '2',
      correctAnswer: 'B',
      incorrectAnswers: ['A', 'C', 'D'],
      question: { text: 'Question 2' },
      tags: [],
      type: '',
      difficulty: '',
      regions: [],
      isNiche: false,
      userResponses: [],
    },
    {
      id: '3',
      correctAnswer: 'C',
      incorrectAnswers: ['A', 'B', 'D'],
      question: { text: 'Question 3' },
      tags: [],
      type: '',
      difficulty: '',
      regions: [],
      isNiche: false,
      userResponses: [],
    },
  ],
  currentQuestionNumber: 1,
  score: 10,
  quizQuestions: true,
  currentQuestion: 'Question 2',
  selectedOption: undefined,
  previousAllowed: false,
  sideWindowVisible: false,
  optionWindowVisible: false,
  timerDuration: 60,
  categories: {
    'Category 1': ['Item 1', 'Item 2', 'Item 3'],
    'Category 2': ['Item 4', 'Item 5', 'Item 6'],
  },
  response: 'B',
  userResponses: ['A', 'B', 'C'],
  options: ['A', 'B', 'C', 'D'],
};
describe('Quiz App Selectors', () => {
  const mockRootState = { quiz: mockState };

  it('selectCurrentQuestionNumber should return the correct current question number', () => {
    const result = selectCurrentQuestionNumber.projector(mockRootState.quiz);
    expect(result).toBe(1);
  });

  it('selectTotalQuestions should return the total number of questions', () => {
    const result = selectTotalQuestions.projector(mockRootState.quiz);
    expect(result).toBe(3);
  });

  it('selectCategories should return the categories', () => {
    const result = selectCategories.projector(mockRootState.quiz);
    expect(result).toEqual({
      'Category 1': ['Item 1', 'Item 2', 'Item 3'],
      'Category 2': ['Item 4', 'Item 5', 'Item 6'],
    });
  });

  it('selectScore should return the score', () => {
    const result = selectScore.projector(mockRootState.quiz);
    expect(result).toBe(10);
  });

  it('selectQuestions should return the questions array', () => {
    const result = selectQuestions.projector(mockRootState.quiz);
    expect(result).toEqual(mockState.questions);
  });

  it('selectSelectedOption should return the selected option', () => {
    const result = selectSelectedOption.projector(mockRootState.quiz);
    expect(result).toBe('B');
  });

  it('selectUserResponses should return the user responses', () => {
    const result = selectUserResponses.projector(mockRootState.quiz);
    expect(result).toEqual(['A', 'B', 'C']);
  });

  it('selectUiTimer should return the timer value', () => {
    const result = selectUiTimer.projector(mockRootState.quiz.timerDuration);
    const expectedFormattedTimer = '01:00';
    expect(result).toBe(expectedFormattedTimer);
  });
  it('selectPercentageQuiz should return the percentage according to the correct Answer quiz', () => {
    const result = selectPercentageQuiz.projector(mockRootState.quiz);
    const expectedPercentage =
      (mockState.score / mockState.questions.length) * 100; // Assuming only one question in the mock state
    expect(result).toEqual(expectedPercentage);
  });

  it('selectUsername should return the username', () => {
    const result = selectUsername.projector(mockRootState.quiz);
    expect(result).toBe('user');
  });
  it('selectSideWindowVisible should return the the window is open or not', () => {
    const result = selectSideWindowVisible.projector(mockRootState.quiz);
    expect(result).toBe(false);
  });
  it('selectOptionWindowVisible should return the the Option Window is Visible or not', () => {
    const result = selectOptionWindowVisible.projector(mockRootState.quiz);
    expect(result).toBe(false);
  });
  it('selectQuizQuestions should return the the quiz question ends or not', () => {
    const result = selectQuizQuestions.projector(mockRootState.quiz);
    expect(result).toBe(true);
  });
  describe('First Question', () => {
    it('should return true if current question number is 1', () => {
      const result = selectFirstQuestion.projector(mockRootState.quiz);

      expect(result).toEqual(true);
    });
  });

  it('selectCorrectAnswer should return the correct answer when current question is available', () => {
    const mockCurrentQuestion = {
      id: '2',
      correctAnswer: 'B',
      incorrectAnswers: ['A', 'C', 'D'],
      question: { text: 'Question 2' },
      tags: [],
      type: '',
      difficulty: '',
      regions: [],
      isNiche: false,
      userResponses: ['A', 'B', 'C', 'D'],
      options: [],
    };
    const result = selectCorrectAnswer.projector(mockCurrentQuestion);
    expect(result).toEqual('B');
  });
  describe('Percentage of the Quiz', () => {
    // const state = mockState;
    // const expectedPercentage = (state.score / state.questions.length) * 100;

    it('should return "Excellent Job!😊👌" if percentage is 100', () => {
      const mockQuizViewState = { percentage: 100 };
      const result = selectMessage.projector(mockQuizViewState.percentage);
      expect(result).toEqual('Excellent Job!😊👌');
    });
    it('should return "Good, keep it up!👌" if percentage is greater than or equal to 80', () => {
      const mockQuizViewState = { percentage: 85 };
      const result = selectMessage.projector(mockQuizViewState.percentage);
      expect(result).toEqual('Good, keep it up!👌');
    });

    it('should return "Keep it up👌" if percentage is greater than or equal to 50', () => {
      const mockQuizViewState = { percentage: 60 };
      const result = selectMessage.projector(mockQuizViewState.percentage);
      expect(result).toEqual('Keep it up👌');
    });

    it('should return "Ohhh!, Prepare for the next time👍" if percentage is greater than or equal to 30', () => {
      const mockQuizViewState = { percentage: 35 };
      const result = selectMessage.projector(mockQuizViewState.percentage);
      expect(result).toEqual('Ohhh!, Prepare for the next time👍');
    });

    it('should return "You have failed the quiz!😒. better luck next time!👍" if percentage is less than 30', () => {
      const mockQuizViewState = { percentage: 20 };
      const result = selectMessage.projector(mockQuizViewState.percentage);
      expect(result).toEqual(
        'You have failed the quiz!😒. better luck next time!👍'
      );
    });
    // it('should return correct message based on percentage', () => {
    //   let expectedMessage = '';

    //   // Calculate expected message based on percentage
    //   if (expectedPercentage === 100) {
    //     expectedMessage = 'Excellent Job!😊👌';
    //   } else if (expectedPercentage >= 80) {
    //     expectedMessage = 'Good, keep it up!👌';
    //   } else if (expectedPercentage >= 50) {
    //     expectedMessage = 'Keep it up👌';
    //   } else if (expectedPercentage >= 30) {
    //     expectedMessage = 'Ohhh!, Prepare for the next time👍';
    //   } else {
    //     expectedMessage =
    //       'You have failed the quiz!😒. better luck next time!👍';
    //   }

    //   const result = selectMessage(mockRootState);

    //   expect(result).toEqual(expectedMessage);
    // });
  });
  describe('selectCurrentQuestion selector', () => {
    const mockState = {
      currentQuestionNumber: 2,
      questions: [
        {
          id: '1',
          correctAnswer: 'A',
          incorrectAnswers: ['B', 'C', 'D'],
          question: { text: 'Question 1' },
          tags: [],
          type: '',
          difficulty: '',
          regions: [],
          isNiche: false,
          userResponses: [],
        },
        {
          id: '2',
          correctAnswer: 'B',
          incorrectAnswers: ['A', 'C', 'D'],
          question: { text: 'Question 2' },
          tags: [],
          type: '',
          difficulty: '',
          regions: [],
          isNiche: false,
          userResponses: [],
        },
        {
          id: '3',
          correctAnswer: 'C',
          incorrectAnswers: ['A', 'B', 'D'],
          question: { text: 'Question 3' },
          tags: [],
          type: '',
          difficulty: '',
          regions: [],
          isNiche: false,
          userResponses: [],
        },
      ],
      score: 0,
      quizQuestions: true,
      currentQuestion: 'Question 2',
      selectedOption: undefined,
      response: '',
      previousAllowed: false,
      userResponses: [],
      categories: {},
      sideWindowVisible: false,
      optionWindowVisible: false,
      timerDuration: 0,
      options: ['A', 'B', 'C', 'D'],
    };

    it('should return the current question based on currentQuestionNumber', () => {
      const expectedCurrentQuestion = {
        id: '2',
        correctAnswer: 'B',
        incorrectAnswers: ['A', 'C', 'D'],
        question: { text: 'Question 2' },
        tags: [],
        type: '',
        difficulty: '',
        regions: [],
        isNiche: false,
        userResponses: [],
      };

      const result = selectCurrentQuestion.projector(
        mockState.questions,
        mockState.currentQuestionNumber
      );

      expect(result).toEqual(expectedCurrentQuestion);
    });

    // it('should return undefined if currentQuestionNumber is out of bounds', () => {
    //   const invalidState = {
    //     ...mockState,
    //     currentQuestionNumber: 0,
    //     questions: [
    //       {
    //         id: '',
    //         correctAnswer: '',
    //         incorrectAnswers: [],
    //         question: { text: '' },
    //         tags: [],
    //         type: '',
    //         difficulty: '',
    //         regions: [],
    //         isNiche: false,
    //         userResponses: [],
    //         options: [],
    //       },
    //     ],
    //   };

    //   const result = selectCurrentQuestion.projector(
    //     invalidState.questions,
    //     invalidState.currentQuestionNumber
    //   );

    //   expect(result).toBeUndefined();
    // });
  });
});
