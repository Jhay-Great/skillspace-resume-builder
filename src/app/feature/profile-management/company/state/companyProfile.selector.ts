import { createSelector } from '@ngrx/store';
import { AppState } from '@src/app/core/state/appState';

export const companyData = (state: AppState) => state.companyProfile;

export const isLoading = createSelector(companyData, (state) => state.isLoading);
export const successMessage = createSelector(companyData, (state) => state.successMessage);
export const errorMessage = createSelector(companyData, (state) => state.error);
export const selectCompanyProfile = createSelector(
    companyData,
    (state) => state.companyProfile
);
export const isCompanyProfileLoaded = createSelector(
    companyData,
    (state) => !!state.companyProfile
  );
