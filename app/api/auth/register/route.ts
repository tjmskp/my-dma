import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import * as z from "zod";

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = userSchema.parse(json);

    // Check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: body.email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          error: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(body.password, 10);

    const newUser = await db.user.create({
      data: {
        name: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        user: newUser,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { user: null, error: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { user: null, error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 