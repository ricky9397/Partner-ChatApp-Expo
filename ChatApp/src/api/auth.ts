import client from './client';
import {AuthResult, User} from './types';

export async function register(params: RegisterParams) {
  const response = await client.post<AuthResult>(
    '/auth/register',
    params
  );
  return response.data;
}

export async function login(params: LoginParams) {

  const refresh_token = client.defaults.headers.refresh_token;
  const auth_token = client.defaults.headers.auth_token

  const response = await client.post<AuthResult>(
    '/auth/login', 
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

export async function matching(params: matchingParams){

}

export async function matchingList(params: matchingList){
  
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
  userEmail: string;
  userPassword: string;
}

interface matchingParams {
  userEmail: string;
  userPassword: string;
}
interface matchingList {
  userEmail: string;
  userPassword: string;
}

