import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import * as z from "zod";

const createCampaignSchema = z.object({
  name: z.string().min(1),
  objective: z.string().min(1),
  budget: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  adAccountId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = createCampaignSchema.parse(json);

    const campaign = await db.campaign.create({
      data: {
        name: body.name,
        objective: body.objective,
        status: "draft",
        budget: parseFloat(body.budget),
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        adAccountId: body.adAccountId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }

    console.error("[CAMPAIGNS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const campaigns = await db.campaign.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 