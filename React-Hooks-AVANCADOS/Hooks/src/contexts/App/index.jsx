import { createContext, useState } from 'react';
import { globalState } from './data';

export const GlobalContext = createContext();
export const AppContext = ({ children }) => {
  const [contextState, setState] = useState(globalState);
  return <GlobalContext.Provider value={{ contextState, setState }}>{children}</GlobalContext.Provider>;
};
