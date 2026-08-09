import React, { createContext, useContext, useState, useCallback } from 'react';

export interface CredentialState {
  name: string;
  role: string;
  photo: string | null; // base64 data URL
  hackerId: string;
}

interface CredentialContextValue {
  credential: CredentialState;
  setName: (name: string) => void;
  setRole: (role: string) => void;
  setPhoto: (photo: string | null) => void;
  generateHackerId: () => void;
  resetCredential: () => void;
}

const generateId = (): string => {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `HH-${num}`;
};

const defaultState: CredentialState = {
  name: '',
  role: '',
  photo: null,
  hackerId: generateId(),
};

const CredentialContext = createContext<CredentialContextValue | null>(null);

export function CredentialProvider({ children }: { children: React.ReactNode }) {
  const [credential, setCredential] = useState<CredentialState>(defaultState);

  const setName = useCallback((name: string) => {
    setCredential(prev => ({ ...prev, name }));
  }, []);

  const setRole = useCallback((role: string) => {
    setCredential(prev => ({ ...prev, role }));
  }, []);

  const setPhoto = useCallback((photo: string | null) => {
    setCredential(prev => ({ ...prev, photo }));
  }, []);

  const generateHackerId = useCallback(() => {
    setCredential(prev => ({ ...prev, hackerId: generateId() }));
  }, []);

  const resetCredential = useCallback(() => {
    setCredential({ ...defaultState, hackerId: generateId() });
  }, []);

  return (
    <CredentialContext.Provider
      value={{ credential, setName, setRole, setPhoto, generateHackerId, resetCredential }}
    >
      {children}
    </CredentialContext.Provider>
  );
}

export function useCredential(): CredentialContextValue {
  const ctx = useContext(CredentialContext);
  if (!ctx) {
    throw new Error('useCredential must be used inside <CredentialProvider>');
  }
  return ctx;
}
