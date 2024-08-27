
export default async function deleteInventoryList(inventoryListId: string) {

  const response = await fetch('/api/inventory/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inventoryListId }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete inventory list');
  }

  return await response.json();
}