export interface LoginResponse {
  id: number;
  email: string;
  role: number;
  status: number | null; 
  accessToken: string;
  expireAt: string;      
  refreshToken: string;
}
