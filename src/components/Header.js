import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Profile from "./Profile";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    isActive ? "text-black font-semibold" : "text-gray-200 hover:text-gray-300";

  return (
    <header className="bg-blue-600 text-white shadow-md top-0 z-50">
      <div className="mx-auto flex items-center justify-between p-4">
        {/* Profile Icon Button aligned to the left */}
        <div className="flex items-center ml-3">
          <Profile />
        </div>

        {/* Dashboard Link */}
        <div className="flex-grow text-center">
          <NavLink to="/" className="text-2xl font-bold" aria-label="Home">
            Admin Dashboard
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="text-xl hidden md:flex justify-evenly flex-grow ml-16"
          aria-label="Main Navigation"
        >
          <NavLink to="/" className={linkClasses}>
            Manage Users
          </NavLink>
          <NavLink to="/roles" className={linkClasses}>
            Roles
          </NavLink>
          <NavLink to="/permissions" className={linkClasses}>
            Permissions
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="block md:hidden text-2xl focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation Sliding from Right */}
      <div
        className={`fixed top-0 right-0 h-full bg-blue-600 text-white w-40 z-40 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 left-4 text-3xl"
          aria-label="Close Navigation Menu"
        >
          ✕
        </button>
        <nav
          className="mt-10 space-y-4 p-4 flex flex-col"
          aria-label="Mobile Navigation"
        >
          <NavLink
            to="/"
            className={linkClasses}
            onClick={() => setMenuOpen(false)}
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/roles"
            className={linkClasses}
            onClick={() => setMenuOpen(false)}
          >
            Roles
          </NavLink>
          <NavLink
            to="/permissions"
            className={linkClasses}
            onClick={() => setMenuOpen(false)}
          >
            Permissions
          </NavLink>
        </nav>
      </div>

      {/* Overlay when menu is open */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;
