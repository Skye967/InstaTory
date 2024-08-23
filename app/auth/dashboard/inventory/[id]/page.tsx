// pages/inventory/[id].tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import getInventoryListItems from "@/util/getInventoryListItems";

type InventoryItem = {
  id: string;
  name: string;
  description?: string;
  quantity: number;
};

export default function InventoryList() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (items.length === 0) {
      const path = pathName.split("/")[4];
      getInventoryListItems({inventoryListId: path}).then((res) => {
        setItems(res);
      });
    }

  }, [items]);

  function handleDelete(itemId: string) {
    // Handle deletion logic here
    setItems(items.filter(item => item.id !== itemId));
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-10 bg-gray-800">
        <nav className="flex space-x-4">
          <a href="#" className="text-gray-300">Dashboard</a>
          <a href="#" className="text-gray-300">Upload</a>
          <a href="#" className="text-gray-300 cursor-pointer">Inventory Lists</a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Items</h1>

        <table className="w-full bg-gray-800 rounded flex flex-col">
          <thead className="w-full">
            <tr className="w-full border border-gray-500 flex justify-between">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items && items.map((item, i) => {
              return (
                <tr key={i} className="border-b border-gray-600 flex justify-between">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.description || "Description"}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 text-white px-4 py-2 mx-2 rounded"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
