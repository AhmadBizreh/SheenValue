export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  token: string;
  email: string;
}

export interface LoginResponse {
  token: string;
}