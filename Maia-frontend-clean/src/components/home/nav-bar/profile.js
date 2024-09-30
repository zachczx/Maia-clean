import React, { useState, useEffect, useRef } from "react";
import { IoPersonCircleOutline, IoChevronDown } from "react-icons/io5";
import { useAuth } from "../../../auth/auth-context";

function Profile() {
  const { logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef();

  const handleProfileOpen = () => {
    console.log(profileOpen);
    console.log("in here");
    setProfileOpen(!profileOpen);
  };

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out");
    }
    setProfileOpen(false);
  };

  const getName = () => {
    const firstName = sessionStorage.getItem("first_name");
    const lastName = sessionStorage.getItem("last_name");
    return `${firstName} ${lastName}`;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div onClick={handleProfileOpen} ref={dropdownRef}>
      <button className="flex items-center gap-x-2">
        <IoPersonCircleOutline size={25} color="white" />
        <p className="text-white text-sm flex gap-x-2">
          <span>{getName()}</span>
          <IoChevronDown className="flex self-center" size={14} />
        </p>
      </button>
      {profileOpen && (
        <div className="absolute mt-[7px] right-0 bg-white rounded-md border border-gray-200 shadow-lg z-50 w-32 py-2 px-3 text-sm">
          <div onClick={handleLogOut}>
            Log Out
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
