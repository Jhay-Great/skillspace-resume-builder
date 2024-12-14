import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment.development';
import { CreateQuizData, getQuizBylocationParams } from '../../models/assessments.model';
import { catchError, map, Observable, retry, take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AssessmentCreationService {
  createQuizVisible = signal(false);
  updateQuizVisible = signal(false);

  skillsQuizData = signal<any[]>([]);
  localRepositoryData = signal<any[]>([]);
  globalRepositoryData = signal<any[]>([]);

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
    return this.http.post<FormData>(`${environment.BASE_API}/v1/quizzes/create`, quiz).pipe(
      map((res: any) => {
        console.log('response from create: ', res);
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

  getAllQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.BASE_API}/v1/quizzes/getAllQuizzes`).pipe(
      take(1),
      retry(3),
      map((res: any) => {
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

  getQuizById(quizId: number): Observable<any[]> {
    return this.http.get<any>(`${environment.BASE_API}/v1/quizzes/${quizId}/getQuizById `).pipe(
      take(1),
      retry(3),
      map((res: any) => {
        console.log('quiz by id: ', res);
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
      .get<any[]>(`${environment.BASE_API}/v1/quizzes/getQuizzesByLocation`, {
        params: httpParams,
      })
      .pipe(
        take(1),
        retry(3),
        map((res: any) => {
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
            return error;
          } else {
            this.isGlobalRepositoryLoading.set(false);
            return error;
          }
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
          const updatedQuiz = res.data;
          // find the quiz id in all the various data and update it with the current Response.data.content

          // Find the quiz in the skillsQuizData signal and update it
          this.skillsQuizData.set(
            this.skillsQuizData().map((quiz) => (quiz.id === quizId ? { ...quiz, ...updatedQuiz } : quiz))
          );

          if (updatedQuiz.isGlobal === true) {
            // Check if that quiz is in local data and remove it from local data
            this.localRepositoryData.set(this.localRepositoryData().filter((quiz) => quiz.id !== quizId));

            // Check if the quiz is not already in global data, then add it
            const existingGlobalQuiz = this.globalRepositoryData().find((quiz) => quiz.id === quizId);
            if (!existingGlobalQuiz) {
              this.globalRepositoryData.set([...this.globalRepositoryData(), updatedQuiz]);
            }
          } else {
            // Check if the quiz is in global data and remove it
            this.globalRepositoryData.set(this.globalRepositoryData().filter((quiz) => quiz.id !== quizId));

            // Add the quiz to the local data
            this.localRepositoryData.set([...this.localRepositoryData(), updatedQuiz]);
          }
          return res.data.content;
        })
      );
  }

  deleteQuiz(quizId: number) {
    return this.http.delete<any>(`${environment.BASE_API}/v1/quizzes/${quizId}/delete`).pipe(
      take(1),
      map((res: any) => {
        // Update the signals after deleting a quiz
        this.skillsQuizData.set(this.skillsQuizData().filter((quiz) => quiz.id !== quizId));
        // update the local/global signals
        this.localRepositoryData.set(this.localRepositoryData().filter((quiz) => quiz.id !== quizId));
        this.globalRepositoryData.set(this.globalRepositoryData().filter((quiz) => quiz.id !== quizId));

        return res;
      })
    );
  }

  updateQuiz(formData: Partial<CreateQuizData>, quizId: number) {
    return this.http.put<any>(`${environment.BASE_API}/v1/quizzes/${quizId}/update`, formData).pipe(
      take(1),
      map((res: any) => {
        const updatedQuiz = res.data;

        // Update the skillsQuizData signal
        this.skillsQuizData.set(
          this.skillsQuizData().map((quiz) => (quiz.id === quizId ? { ...quiz, ...updatedQuiz } : quiz))
        );

        // Check if the updated quiz is global or local and update the data
        if (updatedQuiz.isGlobal) {
          // Update global repository data
          this.globalRepositoryData.set(
            this.globalRepositoryData().map((quiz) => (quiz.id === quizId ? updatedQuiz : quiz))
          );
          // Remove from local if it exists
          this.localRepositoryData.set(this.localRepositoryData().filter((quiz) => quiz.id !== quizId));
        } else {
          // Update local repository data
          this.localRepositoryData.set(
            this.localRepositoryData().map((quiz) => (quiz.id === quizId ? updatedQuiz : quiz))
          );
          // Remove from global if it exists
          this.globalRepositoryData.set(this.globalRepositoryData().filter((quiz) => quiz.id !== quizId));
        }

        return res.data;
      })
    );
  }
}
