import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

type AuthProviderType = {
  children: ReactNode;
};

type AuthResponse = {
  token: string;
  user: User;
};

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = (props: AuthProviderType) => {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=be6f2a7a695f938a0b31`;

  const [user, setUser] = useState<User | null>(null);

  function signOut() {
    setUser(null);
    localStorage.removeItem('@app:token');
  }

  async function signIn(code: string) {
    const res = await api.post<AuthResponse>('/authenticate', { code: code });

    const { token, user } = res?.data;

    localStorage.setItem('@app:token', token);
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      // Limpa Codigo  da URL após obtê-lo
      window.history.pushState({}, ``, urlWithoutCode);
      signIn(githubCode);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('@app:token');
    // console.log(token);

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('/user/profile').then((res) => {
        // console.log(res?.data);
        setUser(res?.data);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
