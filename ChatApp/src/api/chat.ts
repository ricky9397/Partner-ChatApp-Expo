import client from './client';
import { ChatResult } from './types';

export async function chat(params: chatParams){

}

export async function getChatList(params: chatListParams){
  const response = await client.post<ChatResult>(
    '/api/v2/matching/chatList',
    params
  );
  
  return response.data;
}


interface chatParams {
  userEmail: string;
  userPassword: string;
}

interface chatListParams {
  id: number | undefined;
  gender: string | undefined;
}


