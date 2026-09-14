'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { getApiBaseUrl } from '@/services/shared/config/runtime-env';

type HealthContextValue = {
  apiUp: boolean | null;
  failClosed: boolean;
};

const HealthContext = createContext<HealthContextValue>({
  apiUp: null,
  failClosed: false,
});

export function HealthProvider({ children }: { children: ReactNode }) {
  const [apiUp, setApiUp] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${getApiBaseUrl()}/health`)
      .then((r) => r.ok)
      .then((ok) => {
        if (!cancelled) setApiUp(ok);
      })
      .catch(() => {
        if (!cancelled) setApiUp(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <HealthContext.Provider
      value={{ apiUp, failClosed: apiUp === false }}
    >
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  return useContext(HealthContext);
}
