"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    
    const fetchData = async () => {
      const res = await fetch('/api/auth/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.json();
    };

    if (!user) {
      fetchData().then(session => {
        setUser(session);
        console.log(session.name);
      });
    }
    console.log(user);

  }, [user]);

  function handleLogout() {
    signOut({ redirect: false }).then(() => {
      router.push("/");
    });
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-10 bg-gray-800">
        <nav className="flex space-x-4">
          <a href="#" className="text-gray-300">Inventory Lists</a>
          <a href="#" className="text-gray-300">Upload</a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="p-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
              <span className="mr-2">▼</span> List 1
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              +
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Filter
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Sort
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </div>

        <table className="w-full bg-gray-800 rounded">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Manufacturer</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {/* Rows */}
            <tr className="border-b border-gray-700">
              <td className="p-2">Item 1</td>
              <td className="p-2">Brand A</td>
              <td className="p-2">Description of item 1</td>
              <td className="p-2">10</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="p-2">Item 2</td>
              <td className="p-2">Brand B</td>
              <td className="p-2">Description of item 2</td>
              <td className="p-2">5</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
