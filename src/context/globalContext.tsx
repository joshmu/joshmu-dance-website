import { createContext, useContext, useState } from "react";

interface IGlobalContext {
  SECTIONS: string[];
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

const globalContext = createContext<IGlobalContext>({
  SECTIONS: [],
  currentView: "",
  setCurrentView: () => {},
});

export function GlobalProvider({ children }) {
  const [currentView, setCurrentView] = useState("hero");

  const SECTIONS = ["home", "about", "news", "critics", "contact"];

  const value = {
    SECTIONS,
    currentView,
    setCurrentView,
  };

  return <globalContext.Provider value={value}>{children}</globalContext.Provider>;
}

export function useGlobalContext() {
  return useContext(globalContext);
}
