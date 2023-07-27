import { useEffect, useState } from 'react';
import { applyToken } from '../api/client';
import { useUserState } from '../contexts/UserContext';
import authStorage from '../storages/authStorage';

export default function useAuthLoadEffect() {
  const [, setUser] = useUserState();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fn = async () => {
      const auth = await authStorage.get();
      if (!auth) {
        return;
      }
      setUser(auth.user);
      applyToken(auth.auth_token, auth.refresh_token);

    };
    fn();
  }, [setUser]);
}