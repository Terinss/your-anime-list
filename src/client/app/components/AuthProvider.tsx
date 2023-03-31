import React, {
  useContext,
  useState,
  createContext,
  useMemo,
  ReactNode,
} from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: string | null;
  login: (user: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (user: string | null): void => {
    setUser(user);
  };

  const logout = (): void => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user, setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
