
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/authOptions";

  const prisma = new PrismaClient();

  export async function PATCH(req: NextRequest, res: NextResponse) {

    if (req.method !== 'PATCH') {
      return NextResponse.json({ status: 405, error: 'Method not allowed' });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "User must be authenticated to delete inventory" },
        { status: 401 }
      );
    }

    const { id, name, description  } = await req.json();

    try {

      await prisma.inventoryList.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          description: description,
        }
      });

      return NextResponse.json({ status: 200, message: 'Inventory updated successfully!' });
    } catch (error) {
      console.error('Error updating list:', error);
      return NextResponse.json({ status: 500, error: 'An error occurred updating list!' });
    }

  }
