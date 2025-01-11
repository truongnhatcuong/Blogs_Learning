import EditArticleForm from "@/app/components/form/EditArticleForm";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function getData(postId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      image: true,
      title: true,
      smallDescription: true,
      slug: true,
      articleContent: true,
      id: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function EditArticleId({
  params,
}: {
  params: { articleId: string; siteId: string };
}) {
  const { articleId, siteId } = await params;
  const data = await getData(articleId);

  return (
    <div>
      <div className="flex items-center">
        <Button size="icon" variant={"outline"}>
          <Link href={`/dashboard/sites/${siteId}`}>
            {" "}
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="ml-1 text-2xl font-bold">Edit Article</h1>
      </div>
      <EditArticleForm data={data} siteId={siteId} />
    </div>
  );
}
