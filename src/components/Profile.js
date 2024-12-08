import React, { useState, useEffect } from "react";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (
      !e.target.closest(".profile-dropdown") &&
      !e.target.closest(".profile-icon")
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      {/* Profile Icon Button */}
      <button
        onClick={toggleDropdown}
        className="w-12 h-12 p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg profile-icon flex items-center justify-center focus:outline-none"
        aria-label="Profile"
      >
        <span className="text-lg font-semibold">P</span>
      </button>

      {/* Profile Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute mt-5 w-56 bg-gray-200 border rounded-xl shadow-lg profile-dropdown z-50 max-w-xs sm:max-w-md"
          style={{
            right: "0",
            left: "auto",
            transform: "translateX(75%)",
          }}
          aria-label="Profile Menu"
        >
          <div className="p-4">
            <h3 className="font-semibold text-gray-800">User Profile</h3>
            <p className="text-gray-600">Manage your settings here.</p>
          </div>
          <hr />
          <div className="p-4">
            <button
              className="w-full text-left text-blue-600 hover:bg-gray-200 p-2 rounded"
              onClick={() => alert("Go to Settings")}
            >
              Settings
            </button>
            <button
              className="w-full text-left text-red-600 hover:bg-gray-200 p-2 rounded"
              onClick={() => alert("Logging out...")}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
