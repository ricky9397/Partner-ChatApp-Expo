import { useNavigation } from '@react-navigation/core';
import { useMutation } from 'react-query';
import { kakaoRegisterOrLogin } from '../api/auth';
import { AuthError } from '../api/types';
import { useUserState } from '../contexts/UserContext';
import { RootStackNavigationProp } from '../screens/types';
import useInform from './useInform';

export default function kakaoRegister() {
  const [, setUser] = useUserState();
  const navigation = useNavigation<RootStackNavigationProp>();
  const inform = useInform();

  const mutation = useMutation(kakaoRegisterOrLogin, {
    onSuccess: data => {
      // setUser(data.user);
      // navigation.pop();
      // applyToken(data.jwt);
      // authStorage.set(data);
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