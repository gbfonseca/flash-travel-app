import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Credentials, User } from '~/models';
import api from '~/services/api';
import AuthenticationService from '~/services/Authentication.service';

interface AuthContextData {
  user: User;
  signIn(data: Credentials): void;
  signed: boolean;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): ReactElement {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [storagedUser, storagedToken] = await AsyncStorage.multiGet([
        '@Flash Travel: user',
        '@Flash Travel: token',
      ]);

      if (storagedUser[1] && storagedToken[1]) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken[1]}`;
        setUser(JSON.parse(storagedUser[1]));
      }
      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = async (data: Credentials) => {
    setLoading(true);
    try {
      const response = await AuthenticationService.signIn(data);

      api.defaults.headers.Authorization = `Bearer ${response.token}`;

      await AsyncStorage.setItem('@Flash Travel: token', response.token);
      await AsyncStorage.setItem(
        '@Flash Travel: user',
        JSON.stringify(response.user),
      );
      setUser(response.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signed: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
