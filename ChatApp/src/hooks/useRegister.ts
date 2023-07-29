import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from 'react-query';
import { register } from '../api/auth';
import { applyToken } from '../api/client';
import { AuthError } from '../api/types';
import { useUserState } from '../contexts/UserContext';
import { RootStackParamList } from '../screens/types';
import authStorage from '../storages/authStorage';
import useInform from './useInform';

export default function useRegister() {
  const [, setUser] = useUserState();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const inform = useInform();

  const mutation = useMutation(register, {
    onSuccess: data => {
      setUser(data.body.user);
      applyToken(data.headers.auth_token, data.headers.refresh_token);
      authStorage.set(data.body);
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