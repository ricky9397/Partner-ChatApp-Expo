import {AxiosError} from 'axios';

export interface User {
  id: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  // provider: string;
  // confirmed: boolean;
  blocked: null | boolean;
  role: string;
  regDate: string;
  modDate: string;
  loginDate: string;
  loginFailCnt: number;
  lockedYn: string;
  gender: string;
}

export interface Article {
  id: number;
  title: string;
  body: string;
  user: User;
  published_at: string;
  created_at: string;
  updated_at: string; 
}

export interface Comment {
  id: number;
  message: string;
  user: User;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResult {
  refresh_token: string;
  auth_token: string;
  user: User;
}

type AuthErrorData = {
  messages: {
    id: string;
    message: string;
  }[];
}[];

export type AuthError = AxiosError<{
  statusCode: number;
  error: string;
  message: AuthErrorData;
  data: AuthErrorData;
}>;