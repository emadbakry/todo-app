import "./App.css";
import Main from "./components/Main";
import React from "react";

function App() {
  // Dark mode
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
    ? document.documentElement.classList.add("dark", "group")
    : document.documentElement.classList.remove("dark");
  function toggleDarkMode() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      // Whenever the user explicitly chooses light mode
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark", "group");
      // Whenever the user explicitly chooses dark mode
      localStorage.theme = "dark";
    }
  }
  // data
  // const [data, setData] = React.useState();
  return (
    <>
      <Main toggleDark={toggleDarkMode} />
    </>
  );
}

export default App;
