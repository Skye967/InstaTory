
import React, { use, useEffect, useState } from 'react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useUser } from '@/context/user';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const router = useRouter();

  useEffect(() => {}, [user]);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  function handleLogout() {
    signOut({ redirect: false }).then(() => {
      router.push("/");
    });
  }

  return (
    <div
      className="relative inline-block w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="border border-gray-500 bg-gray-900 w-full px-4 py-2 text-left focus:outline-none"
      >
        {user?.name ? "Profile, " + user.name : "Profile"}
        <span className="float-right">
          ▼
        </span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full border-b border-gray-500 bg-gray-900 shadow-lg">
          {user?.name ?
            (<li
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-gray-400 border-b border-gray-500 cursor-pointer"
            >
              Logout
            </li>)
            : (
              <div className='flex flex-col'>
                <Link href="/auth/login"
                  className="px-4 py-2 hover:bg-gray-400 border-b border-gray-500 cursor-pointer"
                >
                  Login
                </Link>
                <Link href="/auth/signup"
                  className="px-4 py-2 hover:bg-gray-400 border-b border-gray-500 cursor-pointer"
                >
                  SignUp
                </Link>
              </div>
            )
          }

        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
