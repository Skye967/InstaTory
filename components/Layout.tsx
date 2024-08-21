import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Your App Name</h1>
          <nav>
            <a href="/" className="mr-4">Home</a>
            <a href="/inventory" className="mr-4">Inventory</a>
            <a href="/upload">Upload</a>
          </nav>
          <div>
            <a href="/profile">Profile</a>
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
