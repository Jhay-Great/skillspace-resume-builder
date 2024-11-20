export interface ICompanyRegistrationDetails  {
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
export interface ICompanyRegistrationResponse extends ICompanyRegistrationDetails {
    role: string;
    approvalStatus: string;
    isOtpVerified: boolean;
}

export interface ITalentRegistrationDetails {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    contact: string;

    // role?: string;
    // isOtpVerified?: boolean;
}
export interface ITalentRegistrationResponse extends ITalentRegistrationDetails {
    role: string;
    isOtpVerified: boolean;

}

export type Status = string;

export interface IOtpData {
    token: string;
    email: string;
}