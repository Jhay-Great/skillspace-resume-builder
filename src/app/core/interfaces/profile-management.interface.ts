export interface ProfileData {
  companyName: string;
  contact: string;
  website: string;
  logo: string;
  certificate: string;
  email: string;
}
export interface CompanyProfileRequestData {
  logo: string;
  certificate: string;
  profileData: ProfileData;
}

export interface ResponseObject {
  profilePicture: string;
  cv: string;
  academicTranscript: string;
  introduction: string;
}
export interface Response {
  statusCode: number;
  message: string;
}
export interface CompanyProfileResponseData extends Response {
  data: ProfileData;
}
export interface ErrorResponse {
  statusCode: number;
  message: string;
  errorTime: string;
  apiPath: string;
}

export interface TalentProfileResponseData extends Response {
  data: TalentProfile;
}
export interface TalentProfileUpdate {
  fullName: string;
  email: string;
  contact: string;
}
export interface TalentProfile extends TalentProfileUpdate {
  academicTranscript: string;
  cv: string;
  educationEndDate: string;
  educationStartDate: string;
  educationStatus: string;
  introduction: string;
  portfolioLinks: string[];
  profilePicture: string;
  programme: string;
  qualificationLevel: string;
  schoolAddress: string;
  schoolCountry: string;
  schoolName: string;
  socialMediaLinks: string[];
}
