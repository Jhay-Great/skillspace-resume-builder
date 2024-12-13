import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AdminApprovalService } from '../service/admin-approval/admin-approval.service';
import { onLoadApplicants, onLoadApplicantsSuccess, onLoadApplicantsFailed } from './approval.actions';
import { catchError, map, of, retry, switchMap } from 'rxjs';

@Injectable()
export class ApplicantsApprovalEffect {
  constructor(
    private actions$: Actions,
    private adminApprovalService: AdminApprovalService
  ) {}

  loadApplicants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onLoadApplicants),
      switchMap(() => {
        return this.adminApprovalService.getCompanies().pipe(
          map((response) => {
            const {
              message,
              data,
            } = response;

            const applicantsData = data;
            return onLoadApplicantsSuccess({ applicants: applicantsData, successMessage: message });
          }),
          retry(3),
          catchError((error) => {
            return of(onLoadApplicantsFailed({ error: error.message }));
          })
        );
      })
    )
  );
}
