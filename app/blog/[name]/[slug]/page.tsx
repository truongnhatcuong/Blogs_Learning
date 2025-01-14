import RenderArticle from "@/app/components/dashboard/RenderArticle";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JSONContent } from "novel";
import React from "react";

async function getData(slug: string) {
  const data = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    select: {
      articleContent: true,
      title: true,
      smallDescription: true,
      image: true,
      createdAt: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

const SlugPage = async ({
  params,
}: {
  params: { slug: string; name: string };
}) => {
  const { slug, name } = await params;
  const data = await getData(slug);

  return (
    <>
      <div className="flex items-center gap-x-3 pt-10 pb-5">
        <Button size={"icon"} asChild variant={"secondary"}>
          <Link href={`/blog/${name}`}>
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-xl font-medium">Go Back</h1>
      </div>
      <div className="flex flex-col items-center justify-evenly mt-10">
        <div className="m-auto w-full text-center md:w-7/12">
          <p className="m-auto my-5 w-10/12 text-sm text-muted-foreground md:text-base font-light ">
            {new Intl.DateTimeFormat("vi-VN", {
              dateStyle: "medium",
            }).format(data.createdAt)}
          </p>
          <h1 className="text-3xl font-bold mb-5 md:text-6xl">{data.title}</h1>
          <p className="m-auto w-10/12 text-muted-foreground line-clamp-3">
            {data.smallDescription}
          </p>
        </div>
      </div>
      <div className="relative m-auto mb-8 h-80 w-full max-w-screen-lg overflow-hidden md:mb-16 md:h-[450px] md:w-5/6 md:rounded-2xl lg:w-2/3">
        <Image
          src={data.image}
          alt=""
          width={1200}
          height={630}
          className="w-full h-full object-cover"
        />
      </div>
      <RenderArticle json={data.articleContent as JSONContent} />
    </>
  );
};

export default SlugPage;
