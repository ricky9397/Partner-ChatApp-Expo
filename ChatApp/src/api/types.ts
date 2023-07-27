import { AxiosError } from 'axios';

export interface User {
  id: number;
  userName: string;
  userEmail: string | undefined;
  userPhone: string;
  provider: string;
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

export interface AuthResult {
  identityToken: string;
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

export interface ChatResult {
  resultCode: number;
  msg: string;
  data: ChatList;
}

export interface ChatList {
  sendMessage : string;
  regDate : string;
  imagePath : string;
  matchingId : number;
  userId : number;
  userName : string;
  success : boolean;
  fail : boolean;
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