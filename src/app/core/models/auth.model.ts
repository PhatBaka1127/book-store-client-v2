export interface AuthResponse {
  id: number;
  email: string;
  role: number;
  status: number | null;
  accessToken: string;
  expireAt: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: number;
}

export interface RefreshRequest {
  accessToken: string,
  refreshToken: string
}