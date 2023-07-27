import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from 'react-query';
import { kakaoLoginOrRegister } from '../api/auth';
import { applyToken } from '../api/client';
import { AuthError } from '../api/types';
import { useUserState } from '../contexts/UserContext';
import { RootStackParamList } from '../screens/types';
import authStorage from '../storages/authStorage';
import useInform from './useInform';

import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function kakaoLogin() {
  const [, setUser] = useUserState();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const inform = useInform();

  const mutation = useMutation(kakaoLoginOrRegister, {
    onSuccess: data => {
      if(data.user.userEmail === undefined || data.user.userEmail === null || data.user.userEmail === "") {
        navigate('AuthEmail', {
          provider : data.user.provider
        });
        return;
      }

      if(data.user.userPhone === undefined || data.user.userPhone === null) {
        navigate('AuthPhone', { 
          userEmail : data.user.userEmail,
          provider : data.user.provider
        });
        return;
      }

      if(data.auth_token && data.refresh_token) {
        setUser(data.user);
        applyToken(data.refresh_token, data.refresh_token);
        authStorage.set(data);
        navigate('RootApp');
      }
      
    },
    onError: (error: AuthError) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ?? '로그인 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });
  return mutation;
}