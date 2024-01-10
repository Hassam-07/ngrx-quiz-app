import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './+state/quiz-app/quiz.models';

@Injectable({
  providedIn: 'root',
})
export class QuizAppService {
  constructor(private http: HttpClient) {}
  getTrivia(): Observable<Question[]> {
    return this.http.get<Question[]>('https://the-trivia-api.com/v2/questions');
  }
}
