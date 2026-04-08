import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { rateLimit } from "@/lib/rateLimit";
import { LoginSchema } from "@/lib/validations";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ??
      "unknown";

    if (!rateLimit(ip)) {
      return Response.json(
        { message: "Terlalu banyak percobaan login" },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      return Response.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    const result = LoginSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { message: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { emailOrUsername, password } = result.data;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      },
    });

    if (!user) {
      return Response.json(
        { message: "Email/username atau password salah" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isValid) {
      return Response.json(
        { message: "Email/username atau password salah" },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user.id,
    });

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return Response.json({
      message: "Login berhasil",
    });

  } catch (error) {
    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}