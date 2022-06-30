import {
  createContext,
  FunctionComponent,
  ReactNode,
  useState,
  useContext,
} from 'react';

type User = {
  name: string;
} | null;

type Auth = {
  user: User;
  login: () => void;
  logout: () => void;
};

const initialAuth: Auth = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<Auth>(initialAuth);
export default AuthContext;

type Props = {
  children: ReactNode;
};

export const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const login = () => {
    setUser({ name: 'Pengfei' });
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  return ctx;
};
