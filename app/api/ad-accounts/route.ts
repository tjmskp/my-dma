import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const adAccounts = await db.adAccount.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(adAccounts);
  } catch (error) {
    console.error("[AD_ACCOUNTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { platform, accountId, name } = body;

    if (!platform || !accountId || !name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // TODO: Implement platform-specific validation and authentication
    const adAccount = await db.adAccount.create({
      data: {
        platform,
        accountId,
        name,
        status: "active",
        userId: session.user.id,
      },
    });

    return NextResponse.json(adAccount);
  } catch (error) {
    console.error("[AD_ACCOUNTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 