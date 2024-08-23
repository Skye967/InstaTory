

export default async function createInventoryList(name: string, description: string, userId: string) {

  const res = await fetch("/api/inventory/create", {
    method: "POST",
    body: JSON.stringify({ name, description, userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const inventoryList = await res.json();

  if(!res.ok) {
    throw new Error(inventoryList.error);
  }

  return inventoryList;
}
