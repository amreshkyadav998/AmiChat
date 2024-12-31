import { useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";

const ThemeProvider = ({ children }) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Set the data-theme attribute on the root element when the theme changes
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return children;
};

export default ThemeProvider;
