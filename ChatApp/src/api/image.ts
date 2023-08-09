import { authStorage } from "../storages/authStorage";
import client from "./client";
import { ImageResult } from "./types";

// 채팅방 목록 리스트 조회
export async function getImageList(params: imageListParam) {
  const token = await authStorage.getToken();
  const response = await client.post<ImageResult>(
    "/api/v2/images/imageList",
    params,
    {
      headers: {
        auth_token: `Bearer ${token?.auth_token}`,
        refresh_token: token?.refresh_token,
      },
    }
  );
  return response.data;
}

interface imageListParam {
  id: number | undefined;
  gender: string | undefined;
}
