"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import userSession from "@/util/userSession";
import CreateListFormModule from "@/components/CreateListFormModule";
import getInventoryLists from "@/util/getInventoryLists";

type User = { name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; id?: string | null | undefined; } | null

export default function Dashboard() {
  const [user, setUser] = useState<User>(null);
  const [inventoryLists, setInventoryLists] = useState<{
    description: string; name: string
  }[]>([]);
  const router = useRouter();

  useEffect(() => {

    if (!user) {
      const fetchData = userSession()
      fetchData.then(session => {
        setUser(session);
      });
    }

    console.log(user);

    if (inventoryLists.length === 0) {
      getInventoryLists().then((res) => {
        setInventoryLists(res);
      });
    }

    console.log(inventoryLists);

  }, [user, inventoryLists]);

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
          <a onClick={() => handleLogout()} className="text-gray-300 cursor-pointer">Sign Out</a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="p-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex justify-center items-center rounded">
              <CreateListFormModule user={user} />
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Filter
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Sort
            </button>
          </div>
        </div>

        <table className="w-full bg-gray-800 rounded flex flex-col">
          <thead className="w-full">
            <tr className="w-full border border-gray-500 flex justify-between">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryLists && inventoryLists.map((list, i) => {
              return (
                <tr key={i} className="border-b border-gray-600 flex justify-between">
                  <td className="p-2">{list.name}</td>
                  <td className="p-2">{list.description}</td>
                  <td className="p-2">
                    <button className="bg-red-500 text-white px-4 py-2 mx-2 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
