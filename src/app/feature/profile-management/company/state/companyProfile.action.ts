import { createAction, props } from '@ngrx/store';
import { ProfileData } from '@src/app/core/interfaces/profile-management.interface';

export const onLoadCompanyData = createAction('[Company Profile Api] Load company profile data');
export const onLoadCompanyDataSuccess = createAction(
  '[Company Profile Api] Successfully loads company profile data',
  props<{ companyProfile: ProfileData; successMessage: string | null }>()
);
export const onLoadCompanyDataFailed = createAction(
  '[Company Profile Api] Failed to load company profile data',
  props<{ error: string }>()
);
