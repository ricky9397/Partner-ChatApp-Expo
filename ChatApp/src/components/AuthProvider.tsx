/* import React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { User } from '../types';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [processingSignup, setProcessingSignup] = useState(false);
  const [processingSignin, setProcessingSignin] = useState(false);

  useEffect(() => {
    const unsubsribe = auth().onUserChanged(async fbUser => {
      console.log('fbUser', fbUser);
      if (fbUser != null) {
        // login
        setUser({
          userId: fbUser.uid,
          email: fbUser.email ?? '',
          name: fbUser.displayName ?? '',
          profileUrl: fbUser.photoURL ?? '',
        });
      } else {
        // logout
        setUser(null);
      }
      setInitialized(true);
    });
    return () => {
      unsubsribe();
    };
  }, []);

} */