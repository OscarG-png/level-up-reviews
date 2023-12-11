import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function useColorScheme() {
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined
  );

  const [isDark, setIsDark] = useState(() => {
    const storedValue = localStorage.getItem("colorScheme");
    return storedValue === null ? !!systemPrefersDark : JSON.parse(storedValue);
  });

  const value = useMemo(() => {
    return isDark === undefined ? !!systemPrefersDark : isDark;
  }, [isDark, systemPrefersDark]);

  useEffect(() => {
    if (value) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // Store the value in localStorage
    localStorage.setItem("colorScheme", JSON.stringify(value));
  }, [value]);

  return {
    isDark: value,
    setIsDark,
  };
}
