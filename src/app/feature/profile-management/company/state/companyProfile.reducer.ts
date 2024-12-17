import { createReducer, on } from '@ngrx/store';
import { onLoadCompanyData, onLoadCompanyDataFailed, onLoadCompanyDataSuccess } from './companyProfile.action';
import { ProfileData } from '@src/app/core/interfaces/profile-management.interface';

export interface CompanyProfileState {
  error: string | null;
  successMessage: string | null;
  isLoading: boolean;
  lastUpdated: number | null;
  companyProfile: ProfileData | null
}
export const initialData: CompanyProfileState = {
  error: null,
  successMessage: null,
  isLoading: false,
  lastUpdated: null,
  companyProfile: null,
};

export const companyProfileReducer = createReducer(
  initialData,
  on(onLoadCompanyData, (state) => ({ ...state, isLoading: true })),
  on(onLoadCompanyDataSuccess, (state, { companyProfile, successMessage }) => ({ 
        ...state, companyProfile, isLoading: false, successMessage 
    })
  ),
  on(onLoadCompanyDataFailed, (state, { error }) => ({ ...state, isLoading: false, error }))
);
