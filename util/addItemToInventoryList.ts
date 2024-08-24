
export default async function addItemToInventoryList(inventoryListId: string, itemName: string, itemDescription: string, quantity: number) {

  const response = await fetch('/api/inventory/item/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inventoryListId, itemName, itemDescription, quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to add item');
  }

  return await response.json();
}