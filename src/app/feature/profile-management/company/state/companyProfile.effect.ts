import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { onLoadCompanyData, onLoadCompanyDataSuccess, onLoadCompanyDataFailed } from './companyProfile.action';
import { catchError, map, of, retry, switchMap, filter, withLatestFrom,  } from 'rxjs';
import { ProfileManagementService } from '../../services/profile-management.service';
import { Store } from '@ngrx/store';
import { AppState } from '@src/app/core/state/appState';
import { isCompanyProfileLoaded } from './companyProfile.selector';

@Injectable()
export class CompanyProfileEffect {
  constructor(
    private actions$: Actions,
    private profileManagementService: ProfileManagementService,
    private store: Store<AppState>
  ) {}

  loadCompanyProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onLoadCompanyData),
      withLatestFrom(this.store.select(isCompanyProfileLoaded)),
      filter(([, isLoaded]) => !isLoaded),
      switchMap(() => {
        return this.profileManagementService.getCompanyData().pipe(
          map((response) => {
            const { message, data } = response;

            console.log(message, data, response);

            // const applicantsData = data;
            const applicantsData = data;
            return onLoadCompanyDataSuccess({ companyProfile: applicantsData, successMessage: message });
          }),
          retry(3),
          catchError((error) => {
            return of(onLoadCompanyDataFailed({ error: error.message }));
          })
        );
      })
    )
  );
}
