import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "react-query";
import { login } from "../api/auth";
// import { applyToken } from '../api/client';
import { AuthError } from "../api/types";
import { useUserState } from "../contexts/UserContext";
import { RootStackParamList } from "../screens/types";
import { Token, authStorage } from "../storages/authStorage";
import useInform from "./useInform";

import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function useLogin() {
  const [, setUser] = useUserState();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const inform = useInform();

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      setUser(data.body.user);
      // applyToken(data.headers.auth_token, data.headers.refresh_token);
      const token: Token = {
        auth_token: data.headers.auth_token,
        refresh_token: data.headers.refresh_token,
      };
      authStorage.setToken(token);

      if (data.body.user.profile === null || data.body.user.profile === undefined || data.body.user.profile.length === 0) {
        navigate("AuthProfile");
        return;
      } else {
        navigate("RootApp");
        return;
      }
    },
    onError: (error: AuthError) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ?? "로그인 실패";
      inform({
        title: "오류",
        message,
      });
    },
  });
  return mutation;
}
