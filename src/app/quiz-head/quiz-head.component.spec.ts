import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizHeadComponent } from './quiz-head.component';

describe('QuizHeadComponent', () => {
  let component: QuizHeadComponent;
  let fixture: ComponentFixture<QuizHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizHeadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
