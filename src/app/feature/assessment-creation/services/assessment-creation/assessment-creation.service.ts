import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment.development';
import { CreateQuizData, getAllQuizzesResponse, getQuizBylocationParams } from '../../models/assessments.model';
import { AllQuizzes } from '@src/app/feature/assessment-taking/models/quiz-taking.model';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AssessmentCreationService {
  createQuizVisible = signal(false);
  updateQuizVisible = signal(false);

  showCreateQuizModal() {
    this.createQuizVisible.set(true);
    this.updateQuizVisible.set(false);
  }

  showUpdateQuizModal() {
    this.updateQuizVisible.set(true);
    this.createQuizVisible.set(false);
  }

  closeQuizModals() {
    this.createQuizVisible.set(false);
    this.updateQuizVisible.set(false);
  }

  constructor(private http: HttpClient) {}

  createQuiz(quiz: CreateQuizData) {
    return this.http.post<FormData>(`${environment.BASE_API}/v1/quizzes/create`, quiz);
  }

  getAllQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.BASE_API}/v1/quizzes/getAllQuizzes`).pipe(
      take(1),
      map((res: any) => {
        return res.data.content;
      })
    );
  }

  getQuizzesByLocation(params: getQuizBylocationParams) {
    const httpParams = new HttpParams()
      .set('location', params.location)
      .set('page', params.page.toString())
      .set('size', params.size.toString());

    return this.http
      .get<any[]>(`${environment.BASE_API}/v1/quizzes/getQuizzesByLocation`, {
        params: httpParams,
      })
      .pipe(
        take(1),
        map((res: any) => {
          return res.data.content;
        })
      );
  }

  changeLocation(quizId: number, newLocation: string) {
    const httpParams = new HttpParams().set('newLocation', newLocation);

    return this.http
      .patch<any>(`${environment.BASE_API}/v1/quizzes/move/${quizId}/location`, {}, { params: httpParams })
      .pipe(
        take(1),
        map((res: any) => {
          return res.data.content;
        })
      );
  }

  deleteQuiz(quizId: number) {
    return this.http.delete<any>(`${environment.BASE_API}/v1/quizzes/${quizId}/delete`);
  }

  updateQuiz(formData: Partial<CreateQuizData>, quizId: number) {
    return this.http.put<any>(`${environment.BASE_API}/v1/quizzes/update/${quizId}`, formData);
  }
}
