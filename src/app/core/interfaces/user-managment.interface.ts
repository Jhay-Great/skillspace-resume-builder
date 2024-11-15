export interface ICompany {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    website: string;
    certificate: FormData;
    logo:FormData;
    contact: string;
}
export interface ITalent {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    contact: string;
}