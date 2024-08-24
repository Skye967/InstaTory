"use client";
import { ReactNode, useState } from 'react';
import ProfileDropdown from './ProfileDropdown';

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Instatory</h1>
          <div>
            <ProfileDropdown/>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Your App Name. All rights reserved.</p>
          <a href="/terms" className="text-sm">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
