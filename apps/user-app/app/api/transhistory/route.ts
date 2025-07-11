import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client";


export async  function GET() {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
    }
    
    const userId = parseInt(session.user.id);
    try {
        const transactions = await db.p2PTransaction.findMany({
        where: {
        OR: [
            { senderId: userId },
            { receiverId: userId }
        ]
        },
        include: {
        sender: {
            select: { id: true, number: true }
        },
        receiver: {
            select: { id: true , number: true }
        }
        }
    });
    console.log("Fetched P2P transactions:", transactions);
    return NextResponse.json({ transactions });
    } catch (error) {
        console.error("Error fetching P2P transactions:", error);
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
     } 
    }