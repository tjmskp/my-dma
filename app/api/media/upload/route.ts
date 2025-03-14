import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Upload the file to your storage service (e.g., Firebase Storage)
    // 2. Get the URL of the uploaded file
    // 3. Save the media asset information to your database

    const mediaAsset = await db.mediaAsset.create({
      data: {
        name: file.name,
        type: file.type,
        size: file.size,
        url: "placeholder-url", // Replace with actual uploaded file URL
        userId: session.user.id,
      },
    });

    return NextResponse.json(mediaAsset);
  } catch (error) {
    console.error("Error uploading media:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}