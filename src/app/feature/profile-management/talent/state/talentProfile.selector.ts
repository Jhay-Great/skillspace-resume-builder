import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TalentProfileData } from './talentProfile.reducer';
import { AppState } from '@src/app/core/state/appState';

export const talentData = (state: AppState) => state.talentProfile;

export const isLoading = createSelector(talentData, (state) => state.isLoading);
export const successMessage = createSelector(talentData, (state) => state.successMessage);
export const errorMessage = createSelector(talentData, (talentData) => talentData.error);
export const selectTalentProfile = createSelector(
    talentData,
    (state) => state.talentProfile
);
export const isTalentProfileLoaded = createSelector(
    talentData,
    (state) => !!state.talentProfile
  );
// export const allApplicants = createSelector(talentData, selectAll);
// export const applicantDetails = (id: number) =>
//   createSelector(talentData, (talentData) => {
//     const applicantData = talentData.entities[id];
//     return applicantData ? applicantData : null;
//   });
