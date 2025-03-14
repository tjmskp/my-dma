import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { campaignId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const campaign = await db.campaign.findUnique({
      where: {
        id: params.campaignId,
      },
    });

    if (!campaign) {
      return new NextResponse("Campaign not found", { status: 404 });
    }

    if (campaign.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await db.campaign.delete({
      where: {
        id: params.campaignId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[CAMPAIGN_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 