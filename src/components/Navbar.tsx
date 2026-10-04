import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isDark, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || localStorage.theme === "dark";
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme ="dark";
      setIsDarkMode(true);
    }
  }

  return (
    <nav className="md:px-2 md:py-4 py-2 border-b border-gray-400">
      <div className="flex justify-between w-full mt-4 ml-4">
        <a href="/">
          <img
            src="/yomikata-logo.svg"
            className="md:w-26 w-16 items-center flex justify-center mb-2 dark:hidden"
            alt="Logo"
          />

          <img
            src="/yomikata-logo-white.svg"
            className="md:w-26 w-16 items-center justify-center mb-2 hidden dark:block"
            alt="Logo-dark"
          />
        </a>

        <div className="flex mr-10 gap-8 md:gap-20 text-sm md:text-xl font-libertinus md:mt-1.5 text-black dark:text-white">
          <NavLink to="/about">About</NavLink>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://shifani-portfolio-website.vercel.app/"
          >
            Contact <i className="ri-arrow-right-up-line"></i>
          </a>
          <div>
            <button onClick={toggleDarkMode} className="hover:cursor-pointer">
              <i className={isDark ? "ri-sun-fill"  : "ri-moon-line"}></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
