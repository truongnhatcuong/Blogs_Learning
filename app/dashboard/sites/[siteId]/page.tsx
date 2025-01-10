import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, FileIcon, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

async function getData(userId: string, siteId: string) {
  const data = await prisma.post.findMany({
    where: {
      userId: userId,
      siteId: siteId,
    },
    select: {
      image: true,
      title: true,
      createdAt: true,
      id: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return data;
}

export default async function pageArticle({
  params,
}: {
  params: { siteId: string };
}) {
  const { siteId } = await params;

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getData(user.id, siteId);

  return (
    <>
      <div className="flex w-full justify-end gap-x-4 ">
        <Button asChild variant={"secondary"}>
          <Link href={"#"}>
            <Book />
            View Blogs
          </Link>
        </Button>
        <Button asChild variant={"secondary"}>
          <Link href={"#"}>
            <Settings />
            Setting
          </Link>
        </Button>
        <Button asChild className="px-3 py-5 bg-blue-500 hover:bg-blue-600">
          <Link href={`/dashboard/sites/${siteId}/create`}>
            {" "}
            <PlusCircle />
            Create Article
          </Link>
        </Button>
      </div>
      {data === undefined || data.length === 0 ? (
        <div className="flex flex-col items-center justify-between rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <FileIcon className="size-9 text-blue-600" />
          </div>
          <h2>you dont have any acrticle created</h2>
          <p className="mb-9 mt-2 text-center leading-tight  text-gray-600 dark:text-gray-200 max-w-sm mx-auto">
            you currently dont have any Sites.Please create some so that you can
            see right here!
          </p>
          <Button asChild className="px-3 py-5 bg-blue-500 hover:bg-blue-600">
            <Link href={`/dashboard/sites/${siteId}/create`}>
              <PlusCircle className="size-20" /> Create Article
            </Link>
          </Button>
        </div>
      ) : (
        <h1>du lieu o day</h1>
      )}
    </>
  );
}
