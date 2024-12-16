import { createSelector, createFeatureSelector } from '@ngrx/store';
import { applicantAdapter, Applicant } from './approval.reducers';

const { selectAll } = applicantAdapter.getSelectors();

const featureApplicant = createFeatureSelector<Applicant>('applicants');

export const isLoading = createSelector(featureApplicant, (state) => state.isLoading);
export const successMessage = createSelector(featureApplicant, (state) => state.successMessage);
export const allApplicants = createSelector(featureApplicant, selectAll);
export const applicantDetails = (id: number) =>
  createSelector(featureApplicant, (featureApplicant) => {
    const applicantData = featureApplicant.entities[id];
    return applicantData ? applicantData : null;
  });
export const errorMessage = createSelector(featureApplicant, (featureApplicant) => featureApplicant.error);
