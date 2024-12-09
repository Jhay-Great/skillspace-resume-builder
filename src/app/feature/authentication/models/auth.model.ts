export enum UserRole {
  admin = 'ADMIN',
  talent = 'TALENT',
  company = 'COMPANY',
}

export interface User {
  accessToken: string;
  refreshToken: string;
  userId: number;
  role: UserRole;
  email: string;
  name: string;
  isOtpVerified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CustomError extends Error {
  error: string;
}

export interface VerifyPasswordOtp {
  email: string;
  token: string;
}

export interface createUserCredentials {
  email: string;
  password: string;
}

export interface refreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
