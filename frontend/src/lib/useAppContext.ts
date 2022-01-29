import { useContext, createContext } from "react";

type AppContextProps = {
  isAuthenticated: boolean;
  userHasAuthenticated: (hasAuthenticated: boolean) => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const useAppContext = () => {
  return useContext(AppContext);
};
