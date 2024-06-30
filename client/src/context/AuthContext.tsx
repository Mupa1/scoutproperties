import { createContext, FC, ReactNode, useEffect, useState } from 'react';

import { INITIAL_USER } from '@/entities/initial-user';
import { User } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  updateUser: (data: User | null) => void;
}

const INITIAL_STATE: AuthContextType = {
  currentUser: INITIAL_USER,
  updateUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('scoutPropertyUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateUser = (data: User | null) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    if (currentUser !== null) {
      localStorage.setItem('scoutPropertyUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('scoutPropertyUser');
    }
  }, [currentUser]);

  const value = {
    currentUser,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
