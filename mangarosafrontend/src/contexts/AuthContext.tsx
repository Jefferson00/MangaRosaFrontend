import { useEffect, useState, createContext, ReactNode, useContext } from 'react';
import api from '../services/api';

type User = {
  name: string;
  password: string;
}

type AuthContextType = {
  token: string | null;
  isAuth: () => boolean;
  signIn: (data: User) => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = () => {
      const token = localStorage.getItem('@MangaRosa:token');

      if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        setToken(token);
      } else {
        api.defaults.headers.authorization = null;
        setToken(null);
      }
    }

    return () => {
      unsubscribe();
    }
  }, []);

  function isAuth() {
    const token = localStorage.getItem('@MangaRosa:token');

    if (token) {
      return true
    } else {
      return false
    }
  }

  async function signIn(data: User) {
    const response = await api.post('admin/auth', data);

    const token = response.data.access_token

    localStorage.setItem('@MangaRosa:token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      isAuth,
      token,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}