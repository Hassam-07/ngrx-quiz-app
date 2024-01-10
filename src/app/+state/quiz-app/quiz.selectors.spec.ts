import { QuizEntity } from './quiz.models';
import {
  quizAdapter,
  QuizPartialState,
  initialQuizState,
} from './quiz.reducer';
import * as QuizSelectors from './quiz.selectors';

describe('Quiz Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getQuizId = (it: QuizEntity) => it.id;
  const createQuizEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as QuizEntity);

  let state: QuizPartialState;

  beforeEach(() => {
    state = {
      quiz: quizAdapter.setAll(
        [
          createQuizEntity('PRODUCT-AAA'),
          createQuizEntity('PRODUCT-BBB'),
          createQuizEntity('PRODUCT-CCC'),
        ],
        {
          ...initialQuizState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Quiz Selectors', () => {
    it('selectAllQuiz() should return the list of Quiz', () => {
      const results = QuizSelectors.selectAllQuiz(state);
      const selId = getQuizId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = QuizSelectors.selectEntity(state) as QuizEntity;
      const selId = getQuizId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectQuizLoaded() should return the current "loaded" status', () => {
      const result = QuizSelectors.selectQuizLoaded(state);

      expect(result).toBe(true);
    });

    it('selectQuizError() should return the current "error" state', () => {
      const result = QuizSelectors.selectQuizError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
