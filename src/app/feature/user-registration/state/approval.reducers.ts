import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { ApplicantsData } from '@core/interfaces/user-registration.interface';
import { onLoadApplicants, onLoadApplicantsFailed, onLoadApplicantsSuccess } from './approval.actions';

export interface Applicant extends EntityState<ApplicantsData> {
  error: string | null;
  successMessage: string | null;
  isLoading: boolean;
  lastUpdated: number | null;
}
export const applicantAdapter: EntityAdapter<ApplicantsData> = createEntityAdapter<ApplicantsData>();
export const initialData: Applicant = applicantAdapter.getInitialState({
  error: null,
  successMessage: null,
  isLoading: false,
  lastUpdated: null,
});

export const applicantsApprovalReducer = createReducer(
  initialData,
  on(onLoadApplicants, (state) => ({ ...state, isLoading: true })),
  on(onLoadApplicantsSuccess, (state, { applicants, successMessage }) =>
    applicantAdapter.setAll(applicants, { ...state, isLoading: false, successMessage })
  ),
  on(onLoadApplicantsFailed, (state, { error }) => ({ ...state, isLoading: false, error }))
);
