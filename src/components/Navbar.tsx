import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="px-2 py-4 border-b border-gray-400">
      <div className="flex justify-between w-full mt-4 ml-4">
        <a href="/">
          <img src="/yomikata-logo.svg" className="w-26 items-center flex justify-center mb-2" alt="Logo" />
        </a>

        <div className="flex mr-10 gap-20 text-xl font-libertinus mt-1.5">
          <NavLink to="/about">About</NavLink>
          <a target="_blank" rel="noopener noreferrer" href="https://shifani-portfolio-website.vercel.app/">
            Contact <i className="ri-arrow-right-up-line"></i>
          </a>
          <div>
            <i className="ri-moon-line"></i>
          </div>
        </div>
      </div>
    </nav>
  );
}
