
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import addItemToInventoryList from '@/util/addItemToInventoryList';
import getInventoryListItems from '@/util/getInventoryListItems';

type InventoryItem = {
  id: string;
  name: string;
  description?: string;
  quantity: number;
};

interface Props {
  listId: string;
  refreshItems: () => Promise<void>;
  setItems: Dispatch<SetStateAction<InventoryItem[]>>
}

const CreateItemFormModule = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {}, [isOpen]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  function handleCreateItem() {
    if (!props.listId) {
      throw new Error("User must be authenticated to create an item!");
    };
    console.log(props.listId, itemName, description, quantity)
    if (!itemName || !quantity) {
      throw new Error("Missing required fields");
    }
    addItemToInventoryList(props.listId, itemName, description, quantity).then((res) => {
      console.log(res);
    });
      togglePopup();
      console.log('refreshing items')
      props.refreshItems().then((newItems) => {
        props.setItems(newItems!);
      });
      // props.setItems(items);
  }

  return (
    <div className=" bg-green-600rounded">
      <button onClick={togglePopup} className="px-4 py-2 bg-green-600 text-white rounded">
        Creat New Item
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Create Item</h2>
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
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className='flex justify-between'>
              <button onClick={handleCreateItem} className="px-4 py-2 bg-green-500 text-white rounded">
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

export default CreateItemFormModule