import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment.development';
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

  createQuiz(quiz: FormData) {
    return this.http.post<FormData>(`${environment.BASE_API}/v1/quizzes/create`, quiz);
  }
  updateQuiz(quiz: FormData, id: number) {
    return this.http.post<FormData>(`${environment.BASE_API}/v1/quizzes/${id}/update`, quiz);
  }
}
