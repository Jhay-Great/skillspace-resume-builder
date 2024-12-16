import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { onLoadTalentData, onLoadTalentDataSuccess, onLoadTalentDataFailed } from './talentProfile.action';
import { catchError, map, of, retry, switchMap, filter, withLatestFrom,  } from 'rxjs';
import { ProfileManagementService } from '../../services/profile-management.service';
import { Store } from '@ngrx/store';
import { AppState } from '@src/app/core/state/appState';
import { isTalentProfileLoaded } from './talentProfile.selector';

@Injectable()
export class TalentProfileEffect {
  constructor(
    private actions$: Actions,
    private profileManagementService: ProfileManagementService,
    private store: Store<AppState>
  ) {}

  loadTalentProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onLoadTalentData),
      withLatestFrom(this.store.select(isTalentProfileLoaded)),
      filter(([, isLoaded]) => !isLoaded),
      switchMap(() => {
        return this.profileManagementService.getTalentDataa().pipe(
          map((response) => {
            const { message, data } = response;

            console.log(message, data, response);

            // const applicantsData = data;
            const applicantsData = data;
            return onLoadTalentDataSuccess({ talentProfile: applicantsData, successMessage: message });
          }),
          retry(3),
          catchError((error) => {
            return of(onLoadTalentDataFailed({ error: error.message }));
          })
        );
      })
    )
  );
}
