import { Header } from "@react-navigation/stack";
import { authStorage } from "../storages/authStorage";
import client from "./client";
import { ImageResult } from "./types";
import FormData from "form-data";

// 사용자 이미지 리스트
export async function getImageList(params: imageListParam) {
  const token = await authStorage.getToken();
  const response = await client.post<ImageResult>(
    "/api/v2/profile/imageList",
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


// 프로필 사진 저장 multipart
export async function profileImageSave(params: FormData) {

  const token = await authStorage.getToken();
  const response = await client.post(
    "/api/v2/profile/imagesSave", 
    params, 
    {
      headers: {
        "Content-Type": "multipart/form-data",
        auth_token: `Bearer ${token?.auth_token}`,
        refresh_token: token?.refresh_token,
      },
    },
  );
  console.log(response.data);
  return response.data;
}

interface imageListParam {
  id: number | undefined;
  gender: string | undefined;
}

interface profileParam {
  userId: number;
  fileName: string;
  filePath: string;
}
