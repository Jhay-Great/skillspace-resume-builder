import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '@src/environments/environment';
import { take, map, Observable, catchError, retry, throwError } from 'rxjs';
import {
  AssessmentTakingQuiz,
  AssessmentTakingQuizResponse,
  AssessmentTakingQuizzesResponse,
  SubmitQuizResponse,
  TakeQuizError,
  UserResponse,
} from '../../models/quiz-taking.model';
import { Quiz } from '@src/app/feature/assessment-creation/models/assessments.model';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AssessmentTakingService {
  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {}
  takeQuizVisible = signal(false);

  allAssessmentsData = signal<AssessmentTakingQuiz[]>([]);
  availableQuizzesData = signal<AssessmentTakingQuiz[]>([]);
  completedQuizzesData = signal<AssessmentTakingQuiz[]>([]);

  isAllAssessmentLoading = signal<boolean>(true);
  isAvailableQuizzesLoading = signal<boolean>(true);
  isCompletedQuizzesLoading = signal<boolean>(true);
  isSubmitQuizLoading = signal<boolean>(true);
  isGetQuizLoading = signal<boolean>(true);

  showTakeQuiz() {
    this.takeQuizVisible.set(true);
  }

  closeTakeQuiz() {
    this.takeQuizVisible.set(false);
  }

  getQuiz(id: number): Observable<AssessmentTakingQuiz | undefined> {
    return this.http.get<AssessmentTakingQuizResponse>(`${environment.BASE_API}/v1/assessments/take/${id}`).pipe(
      map((res) => {
        this.isGetQuizLoading.set(false);
        return res.data;
      }),
      catchError((error: TakeQuizError) => {
        this.isGetQuizLoading.set(false);
        const errorMessage = error.error.data.errorMessage;
        this.toastService.showError('Quiz Expired', errorMessage);
        this.takeQuizVisible.set(false);
        throw error;
      })
    );
  }

  getAllQuizzes() {
    return this.http.get(`${environment.BASE_API}/v1/quizzes`);
  }

  getAllAssessments(): Observable<AssessmentTakingQuiz[]> {
    return this.http.get<AssessmentTakingQuizzesResponse>(`${environment.BASE_API}/v1/assessments/manage`).pipe(
      take(1),
      retry(3),
      map((res) => {
        this.allAssessmentsData.set(res.data);
        this.isAllAssessmentLoading.set(false);
        return res.data;
      }),
      catchError((error) => {
        this.isAllAssessmentLoading.set(false);
        throw error;
      })
    );
  }

  getAvailableQuizzes(): Observable<AssessmentTakingQuiz[]> {
    return this.http.get<AssessmentTakingQuizzesResponse>(`${environment.BASE_API}/v1/assessments/available`).pipe(
      take(1),
      retry(3),
      map((res) => {
        this.availableQuizzesData.set(res.data);
        this.isAvailableQuizzesLoading.set(false);
        return res.data;
      }),
      catchError((error) => {
        this.isAvailableQuizzesLoading.set(false);
        throw error;
      })
    );
  }
  getcompletedQuizzes(): Observable<AssessmentTakingQuiz[]> {
    return this.http.get<AssessmentTakingQuizzesResponse>(`${environment.BASE_API}/v1/assessments/completed`).pipe(
      take(1),
      retry(3),
      map((res) => {
        this.completedQuizzesData.set(res.data);

        this.isCompletedQuizzesLoading.set(false);
        return res.data;
      }),
      catchError((error) => {
        this.isCompletedQuizzesLoading.set(false);
        throw error;
      })
    );
  }

  submitQuiz(submitQuizData: UserResponse) {
    return this.http.post<SubmitQuizResponse>(`${environment.BASE_API}/v1/assessments/submit/`, submitQuizData).pipe(
      take(1),
      retry(3),
      map((res: SubmitQuizResponse) => {
        this.isSubmitQuizLoading.set(false);
        this.getAllAssessments().subscribe();
        this.getcompletedQuizzes().subscribe();
        return res.data;
      }),
      catchError((error) => {
        this.isSubmitQuizLoading.set(false);
        return throwError(() => error);
      })
    );
  }
}
