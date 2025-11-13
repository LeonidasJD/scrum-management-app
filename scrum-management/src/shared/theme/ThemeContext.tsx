import React, { createContext, ReactNode, useContext } from "react";
import { Colors, FontFamilies, FontSizes } from "./appTheme";

export type Theme = {
  colors: typeof Colors.light;
  fonts: typeof FontFamilies;
  fontSizes: typeof FontSizes;
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme: Theme = {
    colors: Colors.light,
    fonts: FontFamilies,
    fontSizes: FontSizes,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
