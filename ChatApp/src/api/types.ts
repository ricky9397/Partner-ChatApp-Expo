import { AxiosError } from "axios";

export interface User {
  id: number;
  userName: string;
  userEmail: string | undefined;
  userPhone: string;
  provider: string;
  blocked: null | boolean;
  role: string;
  regDate: string;
  modDate: string;
  loginDate: string;
  loginFailCnt: number;
  lockedYn: string;
  gender: string;
  userBirthDay: string;
  profile: Profile[];
}

export interface Profile {
  profileId: number;
  userId: number;
  imageId: number;
  fileName: string;
  filePath: string;
}

export interface ChatResult {
  matchingId: number;
  id: number;
  imagePath: string;
  userName: string;
  sendMessage: string;
  regDate: string[];
}

export interface ImageResult {
  profileId: number;
  userId: number;
  fileNo: number;
  fileName: string;
  filePath: string;
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
