
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/authOptions";

  const prisma = new PrismaClient();

  export async function DELETE(req: NextRequest, res: NextResponse) {
    
    if (req.method !== 'DELETE') {
      return NextResponse.json({ status: 405, error: 'Method not allowed' });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "User must be authenticated to delete inventory" },
        { status: 401 }
      );
    }

    const { itemId } = await req.json();

    try {
      // Delete inventory list from Prisma
      await prisma.item.delete({
        where: {
          id: itemId,
        },
      });
      return NextResponse.json({ status: 200, message: 'Inventory item deleted successfully' });
    } catch (error) {
      console.error('Error deleting inventory list:', error);
      return NextResponse.json({ status: 500, error: 'An error occurred while deleting the item.' });
    }

  }
