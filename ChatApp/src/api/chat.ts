import client from './client';
import { User } from './types';

export async function chat(params: chatParams){

}

export async function getChatList(params: chatList){
  const response = await client.post<User>(
    '/matching/chatList',
    params
  );
  return response.data;
}


interface chatParams {
  userEmail: string;
  userPassword: string;
}
interface chatList {
  userEmail: string;
  userPassword: string;
}