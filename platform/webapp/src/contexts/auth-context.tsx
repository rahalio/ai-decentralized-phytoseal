'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  clearAuthTokens,
  getAccessToken,
  getApiKey,
  isAuthenticated,
  setApiKey,
  setAuthTokens,
} from '@/services/shared/infrastructure/auth-tokens';
import { apiClient } from '@/services/shared/infrastructure/api-client';

type AuthContextValue = {
  ready: boolean;
  signedIn: boolean;
  signInWithDemoKey: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready] = useState(true);
  const [signedIn, setSignedIn] = useState(() =>
    typeof window === 'undefined' ? false : isAuthenticated(),
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      ready,
      signedIn,
      signInWithDemoKey: () => {
        setApiKey('phytoseal_demo_local_dev_key');
        setSignedIn(true);
      },
      signIn: async (email, password) => {
        const res = await apiClient.post<{
          data?: { accessToken?: string; refreshToken?: string };
        }>('/v0/auth/login', { body: { email, password } });
        const access = res.data?.data?.accessToken;
        if (!access) throw new Error('Login did not return a token');
        setAuthTokens({
          accessToken: access,
          refreshToken: res.data?.data?.refreshToken,
        });
        setSignedIn(true);
      },
      signOut: () => {
        clearAuthTokens();
        setSignedIn(false);
      },
    }),
    [ready, signedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth requires AuthProvider');
  return ctx;
}

export function useOptionalAuth() {
  return useContext(AuthContext);
}

export function peekAuthHeaders() {
  return { token: getAccessToken(), key: getApiKey() };
}
