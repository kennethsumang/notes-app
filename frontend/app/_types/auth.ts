export interface AuthUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string|null;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  retype_password: string;
}

export interface AuthApiResponse {
  user: AuthUser;
  token: string;
}