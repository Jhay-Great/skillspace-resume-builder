import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '@src/environments/environment';
import { take, map, Observable } from 'rxjs';
import { QuizToTake } from '../../models/quiz-taking.model';
import { Quiz } from '@src/app/feature/assessment-creation/models/assessments.model';

@Injectable({
  providedIn: 'root',
})
export class AssessmentTakingService {
  constructor(private http: HttpClient) {}

  // getQuiz(id: number) {
  //   return this.http.get(`${environment.BASE_API}/v1/quizzes/${id}`);
  // }

  // takeVisible = signal(false);
  getQuiz(id: number | null): Observable<QuizToTake | undefined> {
    return this.http.get<QuizToTake[]>(`assets/data/quizData.json`).pipe(
      take(1),
      map((res: QuizToTake[]) => res.find((quiz: QuizToTake) => quiz.id === id))
    );
  }

  getAllQuizzes() {
    return this.http.get(`${environment.BASE_API}/v1/quizzes`);
  }
}
