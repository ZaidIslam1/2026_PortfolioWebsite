import React from "react";

export default function Header() {
  return (
    <nav className="fixed top-0 w-full bg-dark-950/80 backdrop-blur-xl border-b border-primary/20 z-50 shadow-lg shadow-primary/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Zaid Islam
          </div>
          <div className="text-xs text-dark-400 font-medium tracking-widest uppercase">
            Portfolio
          </div>
        </div>
        <ul className="flex gap-8 text-sm font-medium">
          <li>
            <a
              href="#home"
              className="text-dark-300 hover:text-primary transition-colors duration-200"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="text-dark-300 hover:text-primary transition-colors duration-200"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-dark-300 hover:text-primary transition-colors duration-200"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-dark-300 hover:text-primary transition-colors duration-200"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
