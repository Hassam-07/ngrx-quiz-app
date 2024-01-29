import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../quiz-interface/quizApp.models';
import { FormGroup } from '@angular/forms';
import { Categories } from '../quiz-interface/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizAppService {
  private apiUrl = 'https://the-trivia-api.com/v2/';
  constructor(private http: HttpClient) {}
  // getTrivia(): Observable<Question[]> {
  //   return this.http.get<Question[]>('https://the-trivia-api.com/v2/questions');
  // }
  getCategories(): Observable<Categories> {
    return this.http.get<Categories>(`${this.apiUrl}categories`);
  }
  getTrivia(formValue: any): Observable<Question[]> {
    let searchParams = new HttpParams();
    const categories = formValue.categories;
    const difficulties = formValue.difficulties;
    const type = formValue.type;
    const totalQuestions = formValue.totalQuestions;

    if (categories) {
      searchParams = searchParams.append('categories', categories);
    }
    if (difficulties) {
      searchParams = searchParams.append('difficulties', difficulties);
    }
    if (type) {
      searchParams = searchParams.append('types', type);
    }
    if (totalQuestions) {
      searchParams = searchParams.append('limit', totalQuestions.toString());
    }
    return this.http.get<Question[]>(
      'https://the-trivia-api.com/v2/questions',
      {
        params: searchParams,
      }
    );
  }
}
