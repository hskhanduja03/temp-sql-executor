import React, { useEffect, useState } from "react";

const themes = ["light", "dark", "subtle-dark-purple", "github-grey", "dracula"];

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.replace("-", " ")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeToggle;
