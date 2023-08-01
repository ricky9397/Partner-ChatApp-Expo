// import client, { applyToken } from './client';
import { authStorage } from '../storages/authStorage';
import client from './client';
import { ChatResult } from './types';

export async function chat(params: chatParams){

}


// 채팅방 목록 리스트 조회
export async function getChatList(params: chatListParams){
  const token = await authStorage.getToken();
  const response = await client.post<ChatResult>(
    '/api/v2/matching/chatList',
    params,
    {
      headers: {
        auth_token: `Bearer ${token?.auth_token}`,
        refresh_token: token?.refresh_token
      }
    }
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


