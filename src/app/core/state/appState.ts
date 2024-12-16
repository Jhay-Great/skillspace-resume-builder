import { CompanyProfileState } from '@src/app/feature/profile-management/company/state/companyProfile.reducer';
import { TalentProfileData } from '@src/app/feature/profile-management/talent/state/talentProfile.reducer';
import { Applicant } from '@src/app/feature/user-registration/state/approval.reducers';

export interface AppState {
  applicants: Applicant;
  talentProfile: TalentProfileData,
  companyProfile: CompanyProfileState,
}
