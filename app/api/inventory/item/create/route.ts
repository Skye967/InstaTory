// pages/api/inventory/addItem.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/lib/authOptions';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({status: 405, error: 'Method not allowed'});
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'User must be authenticated to get inventory lists' },
      { status: 401 }
    );
  }

  const userId = (session.user as { id: string }).id;

  const { itemName, itemDescription, quantity, inventoryListId } = await req.json();

  console.log(inventoryListId,itemDescription, itemName, quantity);

  if (!inventoryListId || !itemName) {
    return NextResponse.json({status: 400, error: 'Missing required fields'});
  }

  try {
    const newItem = await prisma.item.create({
      data: {
        name: itemName,
        description: itemDescription,
        quantity: quantity, // Add the quantity property with an appropriate value
        inventoryListId: inventoryListId
      },
    });

    return NextResponse.json({status: 201, message: 'Item created', item: newItem});
  } catch (error) {
    console.error(error);
    return NextResponse.json({status: 500, error: 'An error occurred while creating the item'});
  }
}