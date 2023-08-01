import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from 'react-query';
import { kakaoRegisterOrLogin } from '../api/auth';
import { AuthError } from '../api/types';
import { useUserState } from '../contexts/UserContext';
import { RootStackParamList } from '../screens/types';
import useInform from './useInform';

import * as WebBrowser from 'expo-web-browser';
//import { applyToken } from '../api/client';
import { Token, authStorage } from '../storages/authStorage';

WebBrowser.maybeCompleteAuthSession();

export default function kakaoRegister() {
  const [, setUser] = useUserState();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const inform = useInform();

  const mutation = useMutation(kakaoRegisterOrLogin, {
    onSuccess: data => {
      setUser(data.body.user);
      // applyToken(data.headers.auth_token, data.headers.refresh_token);
      const token: Token = {
        auth_token: data.headers.auth_token,
        refresh_token: data.headers.refresh_token,
      }
      authStorage.setToken(data.body);

      navigate('RootApp');
    },
    onError: (error: AuthError) => {
      console.log(error);
      console.log(error.response?.data);
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ?? '회원가입 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });
  return mutation;
}