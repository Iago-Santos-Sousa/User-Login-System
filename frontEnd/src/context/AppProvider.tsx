import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

interface UserInfos {
  email: string;
  nome: string;
  userId: number;
}

interface authContextValueType {
  token?: string;
  user: UserInfos | null;
  signIn: (user: UserInfos, newToken: string) => Promise<void>;
  signOut: () => void;
  handleImgUser: (img: string) => void;
  userImg: string | null;
}

interface PropsContext {
  children: React.ReactNode;
}

// Crie o contexto de autenticação
const AppContext = createContext<authContextValueType | null>(null);

export const AppProvider = ({ children }: PropsContext): React.ReactNode => {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<UserInfos | null>(null);
  const [userImg, setUserImg] = useState<string | null>(null);

  const handleImgUser = (img: string): void => {
    setUserImg(img);
  };

  const validateSession = async (): Promise<void> => {
    console.log("validateSession rodou");
    const sessionToken = sessionStorage.getItem("user.token");
    const sessionUser = sessionStorage.getItem("user.user");

    if (sessionToken && sessionUser) {
      const sessionUserParsed: UserInfos = JSON.parse(sessionUser);
      setToken(sessionToken);
      setUser(sessionUserParsed);
    }
  };

  const signIn = async (user: UserInfos, newToken: string): Promise<void> => {
    console.log("sigIn rodou");
    setToken(newToken);
    setUser(user);
    sessionStorage.setItem("user.token", newToken);
    sessionStorage.setItem("user.user", JSON.stringify(user));
  };

  const signOut = (): void => {
    setToken("");
    setUser(null); // pode estar errado
    sessionStorage.clear();
  };

  useEffect(() => {
    (async () => {
      validateSession();
    })();
  }, []);

  const authContextValue: authContextValueType = {
    token,
    user,
    signIn,
    signOut,
    handleImgUser,
    userImg,
  };

  // Objeto de valor que será fornecido pelo contexto
  return (
    <AppContext.Provider value={authContextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Função para usar o contexto de autenticação em outros componentes
export const useLogin = (): authContextValueType | null => {
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const { token, user, signIn, signOut, handleImgUser, userImg } = appContext;

  return {
    token,
    user,
    signIn,
    signOut,
    handleImgUser,
    userImg,
  };
};
