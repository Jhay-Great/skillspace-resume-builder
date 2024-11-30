export interface Response {
    statusCode: number;
    message: string;
}
export interface CompanyRegistrationDetails  {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    website: string;
    certificate: FormData;
    logo:FormData;
    contact: string;
}
export interface CompanyResponseData extends CompanyRegistrationDetails {
    role: string;
    approvalStatus: string;
    isOtpVerified: boolean;
}
export interface CompanyRegistrationResponse extends Response {
    data: CompanyResponseData;
}

export interface TalentRegistrationDetails {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    contact: string;
    
}

export interface TalentResponseData extends TalentRegistrationDetails {
    role: string;
    isOtpVerified: boolean;

}
export interface TalentRegistrationResponse extends Response {
    data: TalentResponseData
}


export type Status = string;

export interface OtpData {
    token: string;
    email: string;
}

export interface ApplicantData {
    name: string;
    email: string;
    status: string;
    date: string;
    image?:string;
}

export interface ApplicantResponse {
    statusCode: number;
    message: string;
    data: DataContent
}
export interface DataContent {
    content: ApplicantsData[];
    size: number;
    totalElements: number;
    totalPages: number;
}
export interface ApplicantsData {
    id: number;
    role: string;
    isOtpVerified: boolean;
    approvalStatus: string;
    logo: string;
    certificate: string;
    name: string;
    email: string;
    website: string;
    contact: string;
    createdAt: string;
}