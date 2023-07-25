import client from './client';
import {AuthResult, User} from './types';

export async function register(params: RegisterParams) {
  try {
    const response = await client.post<AuthResult>(
      '/api/v1/auth/register',
      params
    );
    return response.data;
  } catch (error) {
    console.log(error);   
  }
}

export async function login(params: LoginParams) {

  const refresh_token = client.defaults.headers.refresh_token;
  const auth_token = client.defaults.headers.auth_token

  const response = await client.post<AuthResult>(
    '/api/v1/auth/login', 
    params,
    {
      headers: {
        refresh_token: refresh_token,
        auth_token: auth_token
      }
    }
  )
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
  userEmail: string;
  userPassword: string;
  userPhone: string;
}

interface LoginParams {
  userEmail: string | undefined;
  userPassword: string;
}


