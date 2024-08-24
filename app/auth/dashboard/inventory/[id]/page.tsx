// pages/inventory/[id].tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import getInventoryListItems from "@/util/getInventoryListItems";
import getInventoryListById from "@/util/getInventoryListById";
import CreateItemFormModule from "@/components/CreateItemFormModule";

type InventoryItem = {
  id: string;
  name: string;
  description?: string;
  quantity: number;
};

type InventoryList = {
  id: string;
  name: string;
  description?: string;
};

export default function InventoryListPage() {
  const [items, setItems] = useState<InventoryItem[] | null>(null);
  const [inventoryList, setInventoryList] = useState<InventoryList | null>(null);
  const router = useRouter();
  const pathName = usePathname();
  const path = pathName.split("/")[4];

  useEffect(() => {
    if (!items) {
      getInventoryListItems({inventoryListId: path}).then((res) => {
        setItems(res);
      });
    }

    if(!inventoryList){
      getInventoryListById({inventoryListId: path}).then((res) => {
        setInventoryList(res);
      });
    }

    console.log(inventoryList)

  }, [items]);

  function handleDelete(itemId: string) {
    // Handle deletion logic here
    if(!items) return;
    setItems(items.filter(item => item.id !== itemId));
  }

  function handleCreateItem() {
    // Handle creation logic here
  };

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
        <h1 className="text-2xl font-bold mb-4">{inventoryList?.name || "List" }</h1>
        <h6 className="text-lg mb-4">{inventoryList?.description || "" }</h6>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex justify-center items-center rounded">
              <CreateItemFormModule listId={path} />
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
              <th className="text-center p-2 w-1/4">Item</th>
              <th className="text-center p-2 w-1/4">Description</th>
              <th className="text-center p-2 w-1/4">Quantity</th>
              <th className="text-center p-2 w-1/4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items && items.map((item, i) => {
              return (
                <tr key={i} className="border-b border-gray-600 flex justify-between">
                  <td className="text-center p-2 w-1/4">{item.name}</td>
                  <td className="text-center p-2 w-1/4">{item.description || "Description"}</td>
                  <td className="text-center p-2 w-1/4">{item.quantity}</td>
                  <td className="text-center p-2 w-1/4">
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
