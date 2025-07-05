import React, { useEffect, useState } from "react";
import TaskBoard from "./components/TaskBoard";
import { ToastContainer } from "react-toastify";
import { FaMoon, FaSun } from "react-icons/fa";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className="app">
      <header className="header">
        <h1>📝 Task Board</h1>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </header>
      <TaskBoard />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;