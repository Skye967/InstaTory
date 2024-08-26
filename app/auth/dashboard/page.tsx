"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import CreateListFormModule from "@/components/CreateListFormModule";
import getInventoryLists from "@/util/getInventoryLists";

export default function Dashboard() {
  const [inventoryLists, setInventoryLists] = useState<{ description: string; name: string }[] | null>(null);

  const fetchInventoryLists = async () => {
    const lists = await getInventoryLists();
    setInventoryLists(lists);
  }

  useEffect(() => {

    if (!inventoryLists) {
        fetchInventoryLists();
    }

  }, [inventoryLists]);

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
            <div className="flex justify-center items-center rounded">
              <CreateListFormModule refreshList={fetchInventoryLists} setList={setInventoryLists}/>
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
              <th className="text-center p-2 w-1/3">List</th>
              <th className="text-center p-2 w-1/3">Description</th>
              <th className="text-center p-2 w-1/3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryLists && inventoryLists.map((list, i) => {
              return (
                <tr key={i} className="border-b border-gray-600 flex justify-between">
                  <td className="text-center p-2 w-1/3">{list.name}</td>
                  <td className="text-center p-2 w-1/3">{list.description}</td>
                  <td className="text-center p-2 w-1/3">
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
