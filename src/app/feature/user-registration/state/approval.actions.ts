import { createAction, props } from '@ngrx/store';
import { ApplicantsData } from '@src/app/core/interfaces/user-registration.interface';

export const onLoadApplicants = createAction('[Companies Api] Load all registered applicant');
export const onLoadApplicantsSuccess = createAction(
  '[Companies Api] Successfully loads all registered companies',
  props<{ applicants: ApplicantsData[]; successMessage: string | null }>()
);
export const onLoadApplicantsFailed = createAction(
  '[Companies Api] Failed to load all registered companies',
  props<{ error: string }>()
);
