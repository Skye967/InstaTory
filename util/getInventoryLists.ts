export default async function getInventoryLists() {

  const res = await fetch("/api/inventory/get-inventory-lists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const inventoryLists = await res.json();

  if(!res.ok) {
    throw new Error(inventoryLists.error);
  }

  return inventoryLists;
}
