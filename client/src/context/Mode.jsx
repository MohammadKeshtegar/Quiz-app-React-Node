import { createContext, useContext, useEffect, useState } from "react";

const ModeContext = createContext({ toggleColorMode: () => {} });

function ModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("mode");
    return savedMode ? JSON.parse(savedMode).mode : "dark";
  });

  const changeMode = () => setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));

  useEffect(
    function () {
      if (mode) {
        localStorage.setItem("mode", JSON.stringify({ mode }));
        document.querySelector("html").classList.toggle("dark");
      }
    },
    [mode]
  );

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (mode === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [mode]);

  return <ModeContext.Provider value={{ changeMode, mode }}>{children}</ModeContext.Provider>;
}

function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) throw new Error("Mode Context is used outside of the provider");
  return context;
}

export { useMode, ModeProvider };
