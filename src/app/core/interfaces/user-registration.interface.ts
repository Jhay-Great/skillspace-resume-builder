export interface ICompanyRegistrationDetails  {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    website: string;
    certificate: FormData;
    logo:FormData;
    contact: string;
}

export interface ITalentRegistrationDetails {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    contact: string;
}

export type Status = string;

export interface IApplicantData {
    name: string;
    email: string;
    status: string;
    date: string;
    image?:string;
}