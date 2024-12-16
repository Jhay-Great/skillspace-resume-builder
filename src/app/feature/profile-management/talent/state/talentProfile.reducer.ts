import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { ApplicantsData } from '@core/interfaces/user-registration.interface';
import { onLoadTalentData, onLoadTalentDataFailed, onLoadTalentDataSuccess } from './talentProfile.action';
import { TalentProfile } from '@src/app/core/interfaces/profile-management.interface';

export interface TalentProfileData {
  error: string | null;
  successMessage: string | null;
  isLoading: boolean;
  lastUpdated: number | null;
  talentProfile: TalentProfile | null
}
// export const talentProfileAdapter: EntityAdapter<TalentProfile> = createEntityAdapter<TalentProfile>();
export const initialData: TalentProfileData = {
  error: null,
  successMessage: null,
  isLoading: false,
  lastUpdated: null,
  talentProfile: null,
};

export const talentProfileReducer = createReducer(
  initialData,
  on(onLoadTalentData, (state) => ({ ...state, isLoading: true })),
  on(onLoadTalentDataSuccess, (state, { talentProfile, successMessage }) => ({ 
        ...state, talentProfile, isLoading: false, successMessage 
    })
  ),
  on(onLoadTalentDataFailed, (state, { error }) => ({ ...state, isLoading: false, error }))
);
