export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

export interface JwtResponse {
  token: string;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  role: string;
}
