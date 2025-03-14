import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import * as z from "zod";

const audienceRequestSchema = z.object({
  campaignId: z.string(),
  targetAudience: z.object({
    age: z.array(z.number()),
    gender: z.array(z.string()),
    interests: z.array(z.string()),
    location: z.array(z.string()),
  }),
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
    const body = audienceRequestSchema.parse(json);

    // Analyze audience based on provided data
    const analysis = {
      campaignId: body.campaignId,
      audienceSize: Math.floor(Math.random() * 1000000),
      reachEstimate: Math.floor(Math.random() * 500000),
      demographics: {
        age: body.targetAudience.age.map(age => ({
          range: `${age}-${age + 9}`,
          percentage: (Math.random() * 100).toFixed(2),
        })),
        gender: body.targetAudience.gender.map(gender => ({
          type: gender,
          percentage: (Math.random() * 100).toFixed(2),
        })),
      },
      interests: body.targetAudience.interests.map(interest => ({
        category: interest,
        affinity: (Math.random() * 10).toFixed(2),
      })),
      locations: body.targetAudience.location.map(location => ({
        name: location,
        potential: Math.floor(Math.random() * 100000),
      })),
      recommendations: [
        "Consider expanding age range for better reach",
        "Add more specific interests to improve targeting",
        "Include neighboring locations for wider coverage",
      ],
    };

    return NextResponse.json(analysis);
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