
export default async function editInventoryList(id: string, name?: string, description?: string) {

  console.log(id, name, description);

  const response = await fetch('/api/inventory/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name, description }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete item!');
  }

  return await response.json();
}