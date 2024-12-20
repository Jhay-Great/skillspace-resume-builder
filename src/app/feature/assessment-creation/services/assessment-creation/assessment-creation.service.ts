import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment.development';
import {
  AssessmentCreationQuiz,
  CreateQuizData,
  deleteQuizResponse,
  getAllQuizzesResponse,
  getQuizByIdResponse,
  getQuizBylocationParams,
  getQuizzesByLocationResponse,
} from '../../models/assessments.model';
import { catchError, map, Observable, retry, take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AssessmentCreationService {
  createQuizVisible = signal(false);
  updateQuizVisible = signal(false);

  skillsQuizData = signal<AssessmentCreationQuiz[]>([]);
  localRepositoryData = signal<AssessmentCreationQuiz[]>([]);
  globalRepositoryData = signal<AssessmentCreationQuiz[]>([]);

  isSkillsQiuzLoading = signal<boolean>(true);
  isLocalRepositoryLoading = signal<boolean>(true);
  isGlobalRepositoryLoading = signal<boolean>(true);

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
    return this.http.post<getQuizByIdResponse>(`${environment.BASE_API}/v1/quizzes/create`, quiz).pipe(
      map((res: getQuizByIdResponse) => {
        // Add the new quiz data to the skills quiz data
        this.skillsQuizData.set([...this.skillsQuizData(), res.data]);

        // Check if the quiz is global or local and update the respective data
        if (res.data.isGlobal) {
          this.globalRepositoryData.set([...this.globalRepositoryData(), res.data]);
        } else {
          this.localRepositoryData.set([...this.localRepositoryData(), res.data]);
        }

        return res.data;
      })
    );
  }

  getAllQuizzes(): Observable<AssessmentCreationQuiz[]> {
    return this.http.get<getAllQuizzesResponse>(`${environment.BASE_API}/v1/quizzes/getAllQuizzes`).pipe(
      take(1),
      retry(3),
      map((res: getAllQuizzesResponse) => {
        this.skillsQuizData.set(res.data.content);
        this.isSkillsQiuzLoading.set(false);
        return res.data.content;
      }),
      catchError((error) => {
        this.isSkillsQiuzLoading.set(false);
        throw error;
      })
    );
  }

  //  v1/quizzes/${id}/getQuizzesById
  getQuizById(quizId: number): Observable<AssessmentCreationQuiz> {
    return this.http.get<getQuizByIdResponse>(`${environment.BASE_API}/v1/quizzes/${quizId}/getQuizById`).pipe(
      take(1),
      retry(3),
      map((res: getQuizByIdResponse) => {
        return res.data;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  getQuizzesByLocation(params: getQuizBylocationParams) {
    const httpParams = new HttpParams()
      .set('location', params.location)
      .set('page', params.page.toString())
      .set('size', params.size.toString());

    return this.http
      .get<getQuizzesByLocationResponse>(`${environment.BASE_API}/v1/quizzes/getQuizzesByLocation`, {
        params: httpParams,
      })
      .pipe(
        take(1),
        retry(3),
        map((res: getQuizzesByLocationResponse) => {
          if (params.location === 'local') {
            this.localRepositoryData.set(res.data.content);
            this.isLocalRepositoryLoading.set(false);
          }
          if (params.location === 'global') {
            this.globalRepositoryData.set(res.data.content);
            this.isGlobalRepositoryLoading.set(false);
          }

          return res.data.content;
        }),
        catchError((error) => {
          if (params.location === 'local') {
            this.isLocalRepositoryLoading.set(false);
            throw error;
          } else {
            this.isGlobalRepositoryLoading.set(false);
            throw error;
          }
        })
      );
  }

  changeLocation(quizId: number, newLocation: string) {
    const httpParams = new HttpParams().set('newLocation', newLocation);

    return this.http
      .patch<getQuizByIdResponse>(
        `${environment.BASE_API}/v1/quizzes/move/${quizId}/location`,
        {},
        { params: httpParams }
      )
      .pipe(
        take(1),
        map((res: getQuizByIdResponse) => {
          // refetch quizzes
          this.refetchQuizzes();
          return res.data;
        })
      );
  }

  deleteQuiz(quizId: number) {
    return this.http.delete<deleteQuizResponse>(`${environment.BASE_API}/v1/quizzes/${quizId}/delete`).pipe(
      take(1),
      map((res: deleteQuizResponse) => {
        // refetch quizzes
        this.refetchQuizzes();
        return res;
      })
    );
  }

  updateQuiz(formData: Partial<CreateQuizData>, quizId: number) {
    return this.http.put<getQuizByIdResponse>(`${environment.BASE_API}/v1/quizzes/${quizId}/update`, formData).pipe(
      take(1),
      map((res: getQuizByIdResponse) => {
        // refetch quizzes
        this.refetchQuizzes();
        return res.data;
      })
    );
  }

  refetchQuizzes() {
    this.getAllQuizzes().subscribe();
    this.getQuizzesByLocation({ location: 'local', page: 0, size: 10 }).subscribe();
    this.getQuizzesByLocation({ location: 'global', page: 0, size: 10 }).subscribe();
  }
}
