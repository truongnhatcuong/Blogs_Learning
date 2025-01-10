/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    return NextResponse.json(
      { message: "lỗi người dùng không đúng" },
      { status: 404 }
    );
  }
  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firtName: user.given_name ?? "",
        lastName: user.family_name || "",
        email: user.email || "",
        profileImage:
          user.picture || `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
  }
  return NextResponse.redirect("http://localhost:3000/dashboard");
}
