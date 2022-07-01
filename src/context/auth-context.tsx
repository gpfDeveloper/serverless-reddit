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
  forgotPassword: (username: string) => void;
  resetPassword: (username: string, authCode: string, password: string) => void;
};

const initialAuth: AuthProps = {
  user: null,
  signUp: Function,
  login: Function,
  logout: Function,
  confirmSignUp: Function,
  forgotPassword: Function,
  resetPassword: Function,
};

const AuthContext = createContext<AuthProps>(initialAuth);
export default AuthContext;

type Props = {
  children: ReactNode;
};

export const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const signUp = async (username: string, email: string, password: string) => {
    await AmpAuth.signUp({ username, password, attributes: { email } });
  };

  const confirmSignUp = async (
    username: string,
    authCode: string,
    password: string
  ) => {
    await AmpAuth.confirmSignUp(username, authCode);
    const curUser = await AmpAuth.signIn(username, password);
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

  const forgotPassword = async (username: string) => {
    await AmpAuth.forgotPassword(username);
  };

  const resetPassword = async (
    username: string,
    authCode: string,
    password: string
  ) => {
    await Auth.forgotPasswordSubmit(username, authCode, password);
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
      value={{
        user,
        login,
        logout,
        signUp,
        confirmSignUp,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  return ctx;
};
