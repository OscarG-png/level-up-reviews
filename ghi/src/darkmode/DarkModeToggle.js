import React from "react";
import Toggle from "react-toggle";
import { useColorScheme } from "./useColorScheme";
import "react-toggle/style.css"
import { FaMoon, FaRegSun   } from "react-icons/fa";


export const DarkModeToggle = () => {
  const { isDark, setIsDark } = useColorScheme();
  return (
    <Toggle
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: <FaMoon />, unchecked: <FaRegSun  /> }}
      aria-label="Dark mode toggle"
      className="custom-toggle"
    />
  );
};

export default DarkModeToggle;
