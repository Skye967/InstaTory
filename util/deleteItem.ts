export default async function deleteItem(itemId: string) {

  const response = await fetch('/api/inventory/item/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ itemId }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete item!');
  }

  return await response.json();
}