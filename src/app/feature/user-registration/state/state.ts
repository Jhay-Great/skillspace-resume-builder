import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ApplicantsData } from '@core/interfaces/user-registration.interface';

export interface Applicant extends EntityState<ApplicantsData> {
  error: string | null;
  isLoading: boolean;
  lastUpdated: number | null;
}
export const applicantAdapter: EntityAdapter<ApplicantsData> = createEntityAdapter<ApplicantsData>();
export const initialData: Applicant = applicantAdapter.getInitialState({
  error: null,
  isLoading: true,
  lastUpdated: null,
});
