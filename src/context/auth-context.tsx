import {
  createContext,
  FunctionComponent,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react';
import { Auth as AmpAuth, Auth } from 'aws-amplify';

type User = {
  username: string;
} | null;

type AuthProps = {
  user: User;
  signUp: (username: string, email: string, password: string) => void;
  confirmSignUp: (username: string, authCode: string, password: string) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const initialAuth: AuthProps = {
  user: null,
  signUp: Function,
  login: Function,
  logout: Function,
  confirmSignUp: Function,
};

const AuthContext = createContext<AuthProps>(initialAuth);
export default AuthContext;

type Props = {
  children: ReactNode;
};

export const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const signUp = (username: string, email: string, password: string) => {
    AmpAuth.signUp({ username, password, attributes: { email } });
  };

  const confirmSignUp = async (
    username: string,
    authCode: string,
    password: string
  ) => {
    await AmpAuth.confirmSignUp(username, authCode);
    await AmpAuth.signIn(username, password);
    const curUser = await Auth.currentAuthenticatedUser();
    setUser(curUser);
  };

  const login = async (username: string, password: string) => {
    const curUser = await AmpAuth.signIn(username, password);
    setUser(curUser);
  };
  const logout = () => {
    setUser(null);
    AmpAuth.signOut();
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const curUser = await Auth.currentAuthenticatedUser();
        console.log(curUser);
        setUser(curUser);
      } catch (err) {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signUp, confirmSignUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  return ctx;
};
