import client from './client';
import { AuthResult, User } from './types';

export async function register(params: RegisterParams) {
  const response = await client.post<AuthResult>(
    '/api/v1/auth/register/email',
    params
  )
  const data = {
    'headers' : response.headers,
    'body' : response.data
  }
  return data;
}

export async function login(params: LoginParams) {
  const response = await client.post<AuthResult>(
    '/api/v1/auth/login', 
    params,
  )
  const data = {
    'headers' : response.headers,
    'body' : response.data
  }
  return data;
}

export async function getEmailCheck(userEmail: EmailParam) {
    const response = await client.post(
      '/api/v1/auth/emailCheck',
      userEmail
    )
    return response.data;
}

export async function kakaoLoginOrRegister(data: string) {
  const response: AuthResult = JSON.parse(data);
  return response;
}

export async function kakaoRegisterOrLogin(params: KakaoRegisterParam) {
  
  const response = await client.post<AuthResult>(
    '/api/v1/auth/register/kakao',
    params
  );

  const data = {
    'headers' : response.headers,
    'body' : response.data
  }
  return data;
}


export async function appleLoginOrRegister(identityToken: string) {
  // Apple 사이트 개발자등록 후 사용 가능 ( 유료 )
  // try {
  //   const response = await client.post<AuthResult>(
  //     '/oauth2/login/apple',
  //     identityToken
  //   )
  //   if (response) return response.data;
  //   return null;  
  // } catch(error){
  //   console.log(error);
  // }
  
}

export async function getLoginStatus() {
  const response = await client.get<User>('/users/me');
  return response.data;
}
 
interface RegisterParams {
  userName: string;
  userEmail: string | undefined;
  userPassword: string;
  userPhone: string;
  userBirthDay: string;
  gender: string;
}

interface LoginParams {
  userEmail: string | undefined;
  userPassword: string;
}

interface EmailParam {
  userEmail: string;
}

interface KakaoRegisterParam {
  userName: string;
  userEmail: string | undefined;
  userPhone: string | undefined;
  userBirthDay: string;
  gender: string
}

