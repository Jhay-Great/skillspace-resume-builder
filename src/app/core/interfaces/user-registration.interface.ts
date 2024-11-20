export interface CompanyRegistrationDetails  {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    website: string;
    certificate: FormData;
    logo:FormData;
    contact: string;

    // role?: string;
    // approvalStatus?: string;
    // isOtpVerified?: boolean;
}
export interface CompanyRegistrationResponse extends CompanyRegistrationDetails {
    role: string;
    approvalStatus: string;
    isOtpVerified: boolean;
}

export interface TalentRegistrationDetails {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    contact: string;

    // role?: string;
    // isOtpVerified?: boolean;
}
export interface TalentRegistrationResponse extends TalentRegistrationDetails {
    role: string;
    isOtpVerified: boolean;

}

export type Status = string;

export interface OtpData {
    token: string;
    email: string;
}

export interface IApplicantData {
    name: string;
    email: string;
    status: string;
    date: string;
    image?:string;
}