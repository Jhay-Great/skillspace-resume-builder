import { createAction, props } from '@ngrx/store';
import { TalentProfile } from '@src/app/core/interfaces/profile-management.interface';

export const onLoadTalentData = createAction('[Talent Profile Api] Load talent profile data');
export const onLoadTalentDataSuccess = createAction(
  '[Talent Profile Api] Successfully loads talent profile data',
  props<{ talentProfile: TalentProfile; successMessage: string | null }>()
);
export const onLoadTalentDataFailed = createAction(
  '[Talent Profile Api] Failed to load talent profile data',
  props<{ error: string }>()
);
