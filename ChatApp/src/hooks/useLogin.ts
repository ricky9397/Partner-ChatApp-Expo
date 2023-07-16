import {useMutation} from 'react-query';
import {login} from '../api/auth';
import {AuthError} from '../api/types';
import {useNavigation} from '@react-navigation/core';
import {useUserState} from '../contexts/UserContext';
import {RootStackParamList} from '../screens/types';
import {applyToken} from '../api/client';
import authStorage from '../storages/authStorage';
import useInform from './useInform';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootApp } from '../RootApp';

export default function useLogin() {
  const [, setUser] = useUserState();
  const navigation = useNavigation<RootStackParamList>();
  const inform = useInform();

  const mutation = useMutation(login, {
    onSuccess: data => {
      console.log(data);
      setUser(data.user);

      // navigation.pop();
      // applyToken(data.jwt);
      // authStorage.set(data);
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