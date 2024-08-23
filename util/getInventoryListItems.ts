export default async function getInventoryListItems(params: { inventoryListId: string }) {

  const res = await fetch(`/api/inventory/item/${params.inventoryListId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const items = await res.json();

  if(!res.ok) {
    throw new Error(items.error);
  }

  return items;
}
