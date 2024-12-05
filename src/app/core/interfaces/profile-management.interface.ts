export interface ProfileData {
    companyName: string;
    contact: string;
    website: string;
    logo: string;
    certificate: string;
    email:string;
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
export interface CompanyProfileResponseData {
    statusCode: number;
    message: string;
    data: ProfileData;
}