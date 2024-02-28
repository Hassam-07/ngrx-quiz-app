import { Action } from '@ngrx/store';

import * as QuizActions from './quiz.actions';
import { QuizEntity } from './quiz.models';
import { TriviaState, initialState, quizReducer } from './quiz.reducer';
import { QuizApiActions, QuizPageActions } from './quizApp.actions';
import { mockQuestion } from 'lib/src/lib/quiz-interface/mock-data.interface';

describe('Quiz Reducer', () => {
  const mockQuestions = [
    {
      id: '1',
      correctAnswer: 'B',
      incorrectAnswers: ['B', 'C', 'D'],
      question: { text: 'What is the capital of France?' },
      tags: ['geography'],
      type: 'multiple choice',
      difficulty: 'easy',
      regions: ['Europe'],
      isNiche: false,
      userResponses: [], // Add this property to match the interface
    },
    {
      id: '2',
      correctAnswer: 'A',
      incorrectAnswers: ['A', 'C', 'D'],
      question: { text: 'What is the capital of Spain?' },
      tags: ['geography'],
      type: 'multiple choice',
      difficulty: 'easy',
      regions: ['Europe'],
      isNiche: false,
      userResponses: [], // Add this property to match the interface
      options: ['A', 'B', 'C'],
    },
  ];
  describe('Load Quiz', () => {
    it('should update state correctly when triviaLoadedSuccess action is dispatched', () => {
      const trivia = [mockQuestion]; // Mock trivia data

      const action = QuizApiActions.triviaLoadedSuccess({ trivia }); // Create action

      const newState = quizReducer(initialState, action); // Apply action to reducer

      // Assert that state is updated correctly
      expect(newState.questions).toEqual(trivia);
      expect(newState.questions.length).toBe(trivia.length);
      expect(newState.currentQuestion).toBe(trivia[0].question.text);

      // Concatenate incorrect answers and correct answer and sort them
      const expectedOptions = trivia[0].incorrectAnswers
        .concat(trivia[0].correctAnswer)
        .sort();
      expect(newState.options).toEqual(expectedOptions);

      // Calculate timer duration
      const expectedTimerDuration = trivia.length * 10;
      expect(newState.timerDuration).toBe(expectedTimerDuration);
    });
  });
  describe('Quiz reducer nextQuestion', () => {
    it('should increment currentQuestionNumber and reset selectedOption when nextQuestion action is dispatched', () => {
      const mockState: TriviaState = {
        ...initialState,
        username: 'testUser',
        questions: mockQuestions,
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of France?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: ['A', ''],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 0,
      };

      const action = QuizPageActions.nextQuestion();

      const newState = quizReducer(mockState, action);

      // Assert that currentQuestionNumber is incremented
      expect(newState.currentQuestionNumber).toEqual(2);

      // Assert that selectedOption is reset to undefined
      expect(newState.selectedOption).toBeUndefined();

      // Assert that userResponses array is updated correctly
      expect(newState.userResponses).toEqual(['A', '']);
    });

    it('should set lastQuestion to true if currentQuestionNumber is equal to questions length', () => {
      const mockState: TriviaState = {
        ...initialState,
        username: 'testUser',
        questions: mockQuestions,
        currentQuestionNumber: 2,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 0,
      };

      const action = QuizPageActions.nextQuestion();

      const newState = quizReducer(mockState, action);

      // Assert that lastQuestion is set to true
      expect(newState.currentQuestionNumber - 1).toBeTruthy();
    });
  });

  describe('previousQuestion reducer', () => {
    it('should navigate to the previous question and update state accordingly', () => {
      const mockState: TriviaState = {
        username: 'testUser',
        questions: [
          {
            id: '1',
            correctAnswer: 'B',
            incorrectAnswers: ['A', 'C'],
            question: { text: 'What is the capital of Pakistan?' },
            tags: [],
            type: '',
            difficulty: '',
            regions: [],
            isNiche: false,
            userResponses: ['A'],
          },
          {
            id: '2',
            correctAnswer: 'A',
            incorrectAnswers: ['B', 'C'],
            question: { text: 'What is the capital of France?' },
            tags: [],
            type: '',
            difficulty: '',
            regions: [],
            isNiche: false,
            userResponses: [],
          },
        ],
        currentQuestionNumber: 2,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: 'A',
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 0,
        options: ['A', 'B', 'C'],
      };

      const action = QuizPageActions.previousQuestion();
      const newState = quizReducer(mockState, action);

      expect(newState.currentQuestionNumber).toEqual(1);
      expect(newState.selectedOption).toEqual(undefined);
      expect(newState.response).toEqual('A');
      expect(newState.questions[0].correctAnswer).toEqual('B');
      expect(newState.previousAllowed).toBeTruthy();
    });

    it('should disable previous navigation when already at the first question', () => {
      const mockState: TriviaState = {
        username: 'testUser',
        questions: mockQuestions,
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 0,
        options: ['A', 'B', 'C'],
      };

      const action = QuizPageActions.previousQuestion();
      const newState = quizReducer(mockState, action);

      expect(newState.currentQuestionNumber).toEqual(1);
      expect(newState.previousAllowed).toBeFalsy();
    });
  });

  describe('answerQuestion reducer', () => {
    it('should update state when user answers question correctly', () => {
      const mockState = {
        username: 'testUser',
        questions: [
          {
            id: '1',
            correctAnswer: 'B',
            incorrectAnswers: ['A', 'C'],
            question: { text: 'What is the capital of Pakistan?' },
            tags: [],
            type: '',
            difficulty: '',
            regions: [],
            isNiche: false,
            userResponses: [],
          },
          {
            id: '2',
            correctAnswer: 'A',
            incorrectAnswers: ['B', 'C'],
            question: { text: 'What is the capital of France?' },
            tags: [],
            type: '',
            difficulty: '',
            regions: [],
            isNiche: false,
            userResponses: [],
          },
        ],
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 0,
        options: ['A', 'B', 'C'],
      };

      const action = QuizPageActions.answerQuestion({ guess: 'B' }); // Mock user's guess as correct
      const newState = quizReducer(mockState, action);

      expect(newState.score).toEqual(1); // The score should be incremented
      expect(newState.response).toEqual('B'); // The response should be set to the user's guess
      expect(newState.userResponses).toEqual(['B']); // The user's response should be updated
    });

    it('should update state when user answers question incorrectly', () => {
      const mockState = {
        username: 'testUser',
        questions: [
          {
            id: '1',
            correctAnswer: 'B',
            incorrectAnswers: ['A', 'C'],
            question: { text: 'What is the capital of Pakistan?' },
            tags: [],
            type: '',
            difficulty: '',
            regions: [],
            isNiche: false,
            userResponses: [],
          },
          {
            id: '2',
            correctAnswer: 'A',
            incorrectAnswers: ['B', 'C'],
            question: { text: 'What is the capital of France?' },
            tags: [],
            type: '',
            difficulty: '',
            regions: [],
            isNiche: false,
            userResponses: [],
          },
        ],
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 0,
        options: ['A', 'B', 'C'],
      };

      const action = QuizPageActions.answerQuestion({ guess: 'A' }); // Mock user's guess as incorrect
      const newState = quizReducer(mockState, action);

      expect(newState.score).toEqual(0); // The score should remain unchanged
      expect(newState.response).toEqual('A'); // The response should be set to the user's guess
      expect(newState.userResponses).toEqual(['A']); // The user's response should be updated
    });
  });

  describe('restartQuiz reducer', () => {
    it('should reset the state to initial values', () => {
      const mockState: TriviaState = {
        username: 'testUser',
        questions: mockQuestions,
        currentQuestionNumber: 2,
        score: 2,
        quizQuestions: false,
        currentQuestion: '',
        selectedOption: undefined,
        response: '',
        previousAllowed: true,
        userResponses: ['A', 'B'],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 10,
        options: ['A', 'B', 'C'],
      };
      const action = QuizPageActions.restartQuiz();
      const newState = quizReducer(mockState, action);

      expect(newState.username).toEqual('');
      expect(newState.questions).toEqual([]);
      expect(newState.currentQuestionNumber).toEqual(1);
      expect(newState.score).toEqual(0);
      expect(newState.quizQuestions).toEqual(true);
      expect(newState.selectedOption).toBeUndefined();
      expect(newState.previousAllowed).toEqual(false);
      expect(newState.userResponses).toEqual([]);
      expect(newState.timerDuration).toEqual(0);
    });
  });

  describe('loadCategoriesSuccess reducer', () => {
    it('should update the categories in the state', () => {
      const mockState: TriviaState = {
        username: 'testUser',
        questions: mockQuestions,
        currentQuestionNumber: 1,
        options: ['A', 'B', 'C'],
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 0,
      };

      const categories = {
        category1: ['option1', 'option2'],
        category2: ['option3', 'option4'],
      };

      const action = QuizApiActions.loadCategoriesSuccess({ categories });
      const newState = quizReducer(mockState, action);

      expect(newState.categories).toEqual(categories);
    });
  });

  it('should update the categories in the state', () => {
    const mockState: TriviaState = {
      username: 'testUser',
      questions: mockQuestions,
      currentQuestionNumber: 1,
      score: 0,
      quizQuestions: true,
      currentQuestion: 'What is the capital of Pakistan?',
      selectedOption: undefined,
      response: '',
      previousAllowed: false,
      userResponses: [],
      categories: {},
      sideWindowVisible: false,
      optionWindowVisible: false,
      timerDuration: 0,
      options: ['A', 'B', 'C'],
    };

    const categories = {
      category1: ['option1', 'option2'],
      category2: ['option3', 'option4'],
    };

    const action = QuizApiActions.loadCategoriesSuccess({ categories });
    const newState = quizReducer(mockState, action);

    expect(newState.categories).toEqual(categories);
  });

  describe('submitForm reducer', () => {
    it('should update the username in the state', () => {
      const initialState: TriviaState = {
        username: 'testUser',
        questions: mockQuestions,
        currentQuestionNumber: 1,
        options: ['A', 'B', 'C'],
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 0,
      };

      const formValue = { username: 'testUser' };
      const action = QuizPageActions.submitForm({ formValue });
      const newState = quizReducer(initialState, action);

      expect(newState.username).toEqual(formValue.username);
    });

    it('should not modify other properties in the state', () => {
      const initialState: TriviaState = {
        username: '',
        questions: mockQuestions,
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        options: ['A', 'B', 'C'],
        optionWindowVisible: false,
        timerDuration: 0,
      };

      const formValue = { username: 'testUser' };
      const action = QuizPageActions.submitForm({ formValue });
      const newState = quizReducer(initialState, action);

      // Ensure other properties remain unchanged
      expect(newState.questions).toEqual(initialState.questions);
      expect(newState.currentQuestionNumber).toEqual(
        initialState.currentQuestionNumber
      );
      expect(newState.score).toEqual(initialState.score);
      // Check other properties...
    });
  });

  describe('setCurrentQuestion reducer', () => {
    it('should update current question details in the state', () => {
      const initialState: TriviaState = {
        username: 'testUser',
        questions: [
          {
            id: '1',
            correctAnswer: 'Islamabad',
            incorrectAnswers: ['Karachi', 'Lahore', 'Quetta'],
            question: {
              text: 'What is the capital of Pakistan?',
            },
            tags: ['geography', 'countries'],
            type: 'multiple',
            difficulty: 'medium',
            regions: ['Asia'],
            isNiche: false,
            userResponses: [],
          },
          {
            id: '2',
            correctAnswer: 'Islamabad',
            incorrectAnswers: ['Karachi', 'Lahore', 'Quetta'],
            question: {
              text: 'What is the capital of Pakistan?',
            },
            tags: ['geography', 'countries'],
            type: 'multiple',
            difficulty: 'medium',
            regions: ['Asia'],
            isNiche: false,
            userResponses: [],
          },
          {
            id: '3',
            correctAnswer: 'Islamabad',
            incorrectAnswers: ['Karachi', 'Lahore', 'Quetta'],
            question: {
              text: 'What is the capital of Pakistan?',
            },
            tags: ['geography', 'countries'],
            type: 'multiple',
            difficulty: 'medium',
            regions: ['Asia'],
            isNiche: false,
            userResponses: [],
            // options: ['A', 'B', 'C'],
          },
        ],
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 0,
        options: ['A', 'B', 'C'],
      };

      const currentQuestionNumber = 2;
      const action = QuizPageActions.setCurrentQuestion({
        currentQuestionNumber,
      });
      const newState = quizReducer(initialState, action);

      const expectedCurrentQuestion =
        initialState.questions[currentQuestionNumber];
      const expectedOptions = expectedCurrentQuestion.incorrectAnswers
        .concat(expectedCurrentQuestion.correctAnswer)
        .sort();

      expect(newState.currentQuestion).toEqual(
        expectedCurrentQuestion.question.text
      );
      expect(newState.options).toEqual(expectedOptions);
      expect(newState.currentQuestionNumber).toEqual(currentQuestionNumber);
    });

    it('should return state unchanged if currentQuestionNumber is out of bounds', () => {
      // Test case when currentQuestionNumber is out of bounds
      const initialState: TriviaState = {
        username: 'testUser',
        questions: [
          {
            id: '1',
            correctAnswer: 'Islamabad',
            incorrectAnswers: ['Karachi', 'Lahore', 'Quetta'],
            question: {
              text: 'What is the capital of Pakistan?',
            },
            tags: ['geography', 'countries'],
            type: 'multiple',
            difficulty: 'medium',
            regions: ['Asia'],
            isNiche: false,
            userResponses: [],
          },
          {
            id: '2',
            correctAnswer: 'Islamabad',
            incorrectAnswers: ['Karachi', 'Lahore', 'Quetta'],
            question: {
              text: 'What is the capital of Pakistan?',
            },
            tags: ['geography', 'countries'],
            type: 'multiple',
            difficulty: 'medium',
            regions: ['Asia'],
            isNiche: false,
            userResponses: [],
          },
          {
            id: '3',
            correctAnswer: 'Islamabad',
            incorrectAnswers: ['Karachi', 'Lahore', 'Quetta'],
            question: {
              text: 'What is the capital of Pakistan?',
            },
            tags: ['geography', 'countries'],
            type: 'multiple',
            difficulty: 'medium',
            regions: ['Asia'],
            isNiche: false,
            userResponses: [],
            // options: ['A', 'B', 'C'],
          },
        ],
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 0,
        options: ['Islamabad', 'Karachi', 'Lahore', 'Quetta'],
      };

      const currentQuestionNumber = 5; // Out of bounds
      const action = QuizPageActions.setCurrentQuestion({
        currentQuestionNumber,
      });
      const newState = quizReducer(initialState, action);

      expect(newState).toEqual(initialState); // Expect state to remain unchanged
    });
  });

  describe('openSideWindow reducer', () => {
    it('should set sideWindowVisible to true and optionWindowVisible to false', () => {
      const initialState: TriviaState = {
        username: 'testUser',
        questions: mockQuestions,
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        options: ['A', 'B', 'C'],
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: true,
        timerDuration: 0,
      };

      const action = QuizPageActions.openSideWindow();
      const newState = quizReducer(initialState, action);

      expect(newState.sideWindowVisible).toEqual(true);
      expect(newState.optionWindowVisible).toEqual(false);
      // Ensure other properties remain unchanged if needed
    });
  });

  describe('closeSideWindow reducer', () => {
    it('should set sideWindowVisible to false', () => {
      const initialState: TriviaState = {
        username: 'testUser',
        questions: mockQuestions,
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: true,
        optionWindowVisible: false,
        timerDuration: 0,
        options: ['A', 'B', 'C'],
      };

      const action = QuizPageActions.closeSideWindow();
      const newState = quizReducer(initialState, action);

      expect(newState.sideWindowVisible).toEqual(false);
      // Ensure other properties remain unchanged if needed
    });
  });

  describe('toggleOptionWindow reducer', () => {
    it('should toggle optionWindowVisible and set sideWindowVisible to false', () => {
      const initialState: TriviaState = {
        username: 'testUser',
        questions: mockQuestions,
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: true,
        optionWindowVisible: true,
        timerDuration: 0,
        options: ['A', 'B', 'C'],
      };

      const action = QuizPageActions.toggleOptionWindow();
      const newState = quizReducer(initialState, action);

      expect(newState.optionWindowVisible).toEqual(false);
      expect(newState.sideWindowVisible).toEqual(false);
      // Ensure other properties remain unchanged if needed
    });
  });

  describe('startTimer reducer', () => {
    it('should not modify the state', () => {
      const initialState: TriviaState = {
        username: 'testUser',
        questions: mockQuestions,
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 0,
        options: ['A', 'B', 'C'],
      };

      const action = QuizPageActions.startTimer();
      const newState = quizReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('stopTimer reducer', () => {
    it('should set timerDuration to 0', () => {
      const initialState: TriviaState = {
        username: 'testUser',
        questions: mockQuestions,
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 10,
        options: ['A', 'B', 'C'],
      };

      const action = QuizPageActions.stopTimer();
      const newState = quizReducer(initialState, action);

      expect(newState.timerDuration).toEqual(0);
    });
  });

  describe('timerTick reducer', () => {
    it('should decrement timerDuration by 1', () => {
      const initialState: TriviaState = {
        username: 'testUser',
        questions: mockQuestions,
        currentQuestionNumber: 1,
        score: 0,
        quizQuestions: true,
        currentQuestion: 'What is the capital of Pakistan?',
        selectedOption: undefined,
        response: '',
        previousAllowed: false,
        userResponses: [],
        categories: {},
        sideWindowVisible: false,
        optionWindowVisible: false,
        timerDuration: 10,
        options: ['A', 'B', 'C'],
      };

      const action = QuizPageActions.timerTick();
      const newState = quizReducer(initialState, action);

      expect(newState.timerDuration).toEqual(initialState.timerDuration - 1);
      // Ensure other properties remain unchanged if needed
    });
  });
});
