import { TestBed } from '@angular/core/testing';

import { QuizAppService } from './quiz-app.service';

describe('QuizAppService', () => {
  let service: QuizAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
