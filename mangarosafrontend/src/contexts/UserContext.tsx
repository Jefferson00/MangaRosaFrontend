import { useState, createContext, ReactNode, useContext } from 'react';
import api from '../services/api';

interface Knowledges {
  id: number;
  name: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  is_validated: boolean;
  validated_at: Date;
  knowledges: Knowledges[];
}

type UserContextType = {
  user: UserData | null;
  handleSelectUser: (user: UserData) => void;
  getUser: (id: number) => Promise<void>
}

type UserProviderProps = {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserProvider(props: UserProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);

  /**
   * Get a user by id and set in state
   * @param id :number
   */
  async function getUser(id: number) {
    try {
      const { data } = await api.get(`users/${id}`);

      setUser(data);

    } catch (error) {
      alert('Não foi possível carregar as informações');
    }
  }

  function handleSelectUser(user: UserData) {
    setUser(user);
  }

  return (
    <UserContext.Provider value={{
      user,
      handleSelectUser,
      getUser,
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const value = useContext(UserContext);

  return value;
}