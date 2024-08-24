"use client";
import Link from "next/link";
import { useUser } from "@/context/user";
import { useEffect } from "react";


export default function Home() {
  const user = useUser();

  useEffect(() => {}, [user]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center">Welcome to Our App</h1>
        <p className="text-center text-gray-600">
          Please sign up or log in to continue.
        </p>
        <div className="space-y-4">
          <Link href="/auth/signup" passHref>
            <div className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded cursor-pointer">
              Sign Up
            </div>
          </Link>
          <Link href="/auth/login" passHref>
            <div className="block w-full py-2 px-4 bg-gray-600 text-white text-center rounded cursor-pointer">
              Log In
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
