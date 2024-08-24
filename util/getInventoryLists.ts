export default async function getInventoryLists() {

  const res = await fetch("/api/inventory/get-inventory-lists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const data = await res.json();

  if(!res.ok) {
    throw new Error(data.error);
  }

  const inventoryLists: {description: string, id: string, name: string}[] = data

  return inventoryLists;
}
