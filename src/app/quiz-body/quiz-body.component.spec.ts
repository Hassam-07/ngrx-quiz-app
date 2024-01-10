import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizBodyComponent } from './quiz-body.component';

describe('QuizBodyComponent', () => {
  let component: QuizBodyComponent;
  let fixture: ComponentFixture<QuizBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizBodyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
