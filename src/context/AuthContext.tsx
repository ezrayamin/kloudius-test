import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

export type AuthUser = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (name: string, email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const getStoredUsers = useCallback(async (): Promise<AuthUser[]> => {
    return [];
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
        setUser({name, email})
      return null;
    },
    [getStoredUsers],
  );

  const login = useCallback(
    async (email: string, password: string) => {
        setUser({name: '', email})
      return null;
    },
    [getStoredUsers],
  );

  const logout = useCallback(async () => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({user, login, signup, logout}),
    [user, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
