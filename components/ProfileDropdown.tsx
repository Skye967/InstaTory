"use client";
import React, { useState, useEffect, use } from 'react';
import { signOut, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useUser } from '@/context/user';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const router = useRouter();

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const handleLogout = () => {
    user?.singOut();
  };

  const isLoggegIn = () => {
    if (user && user.id) {
      return (
        <>
          <li className="px-4 py-2 hover:bg-gray-700 border-b border-gray-400">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      );
    } else {
      return (
        <>
              <li className="px-4 py-2 hover:bg-gray-700 border-b border-gray-400">
                <Link href="/auth/login">
                  Login
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 border-b border-gray-400">
                <Link href="/auth/signup">
                  Sign Up
                </Link>
              </li>
            </>
      )
    }
  };


  return (
    <div
      className="relative inline-block w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="border border-gray-500 bg-gray-900 w-full px-4 py-2 text-left focus:outline-none">
        {user?.name ? `Profile, ${user.name}` : "Profile"}
        <span className="float-right">▼</span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full border border-gray-500 bg-gray-900 shadow-lg">
          {isLoggegIn()}
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;