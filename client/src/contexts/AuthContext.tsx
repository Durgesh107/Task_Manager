import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { data, loading, refetch } = useMeQuery();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    if (data?.me) {
      setUser(data.me as User);
    } else {
      setUser(null);
    }
  }, [data]);

  const logout = async () => {
    try {
      await logoutMutation();
      setUser(null);
      await refetch();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refetchUser = () => {
    refetch();
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
