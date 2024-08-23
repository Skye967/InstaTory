// app/api/inventory/getAll/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // const session = await getServerSession(authOptions);

    // if (!session) {
    //   return NextResponse.json(
    //     { error: 'User must be authenticated to get inventory lists' },
    //     { status: 401 }
    //   );
    // }

    // const userId = (session.user as { id: string }).id;

    const inventoryLists = await prisma.inventoryList.findMany({
      where: {
        userId: "7b185a2f-2e92-4e17-ba50-a58e64f97a85",
      },
    });

    return NextResponse.json(inventoryLists);
  } catch (error) {
    console.error('Error fetching inventory lists:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching inventory lists' },
      { status: 500 }
    );
  }
}
