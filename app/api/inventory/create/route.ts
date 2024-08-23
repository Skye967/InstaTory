// app/api/inventory/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next"
import authOptions from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'User must be authenticated to create an inventory list' },
        { status: 401 }
      );
    }

    const { name, description, userId } = await req.json();
    
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required to create an inventory list' },
        { status: 400 }
      );
    }
    
    const newInventory = await prisma.inventoryList.create({
      data: {
        name,
        description,
        userId: userId,
      },
    });

    return NextResponse.json({ message: 'Inventory list created', inventory: newInventory });
  } catch (error) {
    console.error('Error creating inventory:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the inventory list' },
      { status: 500 }
    );
  }
}
