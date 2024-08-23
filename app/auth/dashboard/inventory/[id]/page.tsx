// pages/inventory/[id].tsx

import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const InventoryListPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Name</h1>
      <p className="mb-4">Inventory Description</p>
      <h2 className="text-xl font-semibold mb-2">Items</h2>
      {/* <ul className="list-disc pl-5">
        {inventoryList.items.map((item) => (
          <li key={item.id} className="mb-2">
            {item.name}: {item.description}
          </li>
        ))}
      </ul> */}
      <Link href="/inventory">
        <a className="text-blue-500">Back to Inventory Lists</a>
      </Link>
    </div>
  );
};

export default InventoryListPage;