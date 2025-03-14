import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import * as z from "zod";

const adAccountSchema = z.object({
  platform: z.enum(["facebook", "google"]),
  accountId: z.string(),
  name: z.string(),
  status: z.string().default("active"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const json = await req.json();
    const body = adAccountSchema.parse(json);

    const adAccount = await db.adAccount.create({
      data: {
        platform: body.platform,
        accountId: body.accountId,
        name: body.name,
        status: body.status,
        userId: session.user.id,
      },
    });

    return NextResponse.json(adAccount);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 