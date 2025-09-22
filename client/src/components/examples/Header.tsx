import { useState } from "react";
import Header from '../Header';

export default function HeaderExample() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log('Dark mode toggled:', !darkMode);
  };

  return <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
}