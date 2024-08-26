
import React, { SetStateAction, useEffect, useState } from 'react';
import createInventoryList from "@/util/createInvetoryList";
import { useUser } from '@/context/user';

type Props = {
  refreshList: () => Promise<void>
  setList: (value: SetStateAction<{
    description: string;
    name: string;
}[] | null >) => void
}

const CreateListFormModule = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inventoryListName, setInventoryListName] = useState('');
  const [description, setDescription] = useState('');
  const user = useUser();

  useEffect(() => {}, [isOpen]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  function handleCreateInventoryList() {
    if (!user) {
      throw new Error("User must be authenticated to create an inventory list");
    };
      createInventoryList(inventoryListName, description, user!.id!).then((res) => {
        console.log(res);
      });
      togglePopup();
      props.refreshList().then((newList) => {
        props.setList(newList!);
      });
  }

  return (
    <div className=" bg-green-600rounded">
      <button onClick={togglePopup} className="px-4 py-2 bg-green-600 text-white rounded">
        Creat new Inventory List
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Create Inventory List</h2>
              <button onClick={togglePopup} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                value={inventoryListName}
                onChange={(e) => setInventoryListName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Description
              </label>
              <input
                id="description"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className='flex justify-between'>
              <button onClick={handleCreateInventoryList} className="px-4 py-2 bg-green-500 text-white rounded">
                Create
              </button>
              <button onClick={togglePopup} className="px-4 py-2 bg-red-500 text-white rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateListFormModule