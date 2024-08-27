export default async function getInventoryListItems(params: { inventoryListId: string }) {

  const res = await fetch(`/api/inventory/get-one-inventory-list/${params.inventoryListId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const list = await res.json();

  if(!res.ok) {
    throw new Error(list.error);
  }

  return list;
}
