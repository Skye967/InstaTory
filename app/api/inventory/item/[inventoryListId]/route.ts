// app/api/inventory/items/[inventoryListId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/authOptions";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { inventoryListId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "User must be authenticated to access inventory items" },
        { status: 401 }
      );
    }

    const { inventoryListId } = params;

    // Fetch all items in the inventory list
    const items = await prisma.item.findMany({
      where: {
        inventoryListId: inventoryListId,
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching inventory items" },
      { status: 500 }
    );
  }
}
