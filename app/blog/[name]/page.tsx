import { ModeToggle } from "@/app/components/dashboard/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function getData(subDir: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      name: true,
      posts: {
        select: {
          smallDescription: true,
          title: true,
          image: true,
          slug: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}
const Page = async ({ params }: { params: { name: string } }) => {
  const { name } = await params;
  const data = await getData(name);

  return (
    <>
      <nav className="grid grid-cols-3 my-10 items-center">
        <div className="col-span-1" />
        <div className="flex items-center  justify-center ">
          <Image
            src={"/logo.png"}
            alt=""
            width={74}
            height={74}
            className="object-cover"
          />
          <h1 className="text-2xl font-semibold">{data.name}</h1>
        </div>

        <div className="col-span-1 flex w-full justify-end">
          <ModeToggle />
        </div>
      </nav>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {data.posts.map((item) => (
          <Card key={item.id}>
            <Image
              src={item.image || "/default.png"}
              alt={item.title}
              width={400}
              height={200}
              className="rounded-t-lg object-cover w-full h-[150px] "
            />
            <CardHeader>
              <CardTitle className="truncate">{item.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {item.smallDescription}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href={`/blog/${name}/${item.slug}`}>Read more</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Page;
