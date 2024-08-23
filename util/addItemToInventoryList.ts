async function addItemToInventoryList(inventoryListId: string, itemName: string, itemDescription: string, quantity: number) {
  const response = await fetch('/api/inventory/addItem', {
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