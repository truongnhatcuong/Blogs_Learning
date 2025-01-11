import { prisma } from "@/lib/client";
import React from "react";
import { requireUser } from "../utils/requireUser";
import EmptyState from "../components/dashboard/EmptyState";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(userId: string) {
  const [sites, article] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
    prisma.post.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  return { sites, article };
}

const PageDashBorad = async () => {
  const user = await requireUser();
  const { article, sites } = await getData(user.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5 ">Your Sites</h1>
      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {sites.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl || "/default.png"}
                alt={item.name}
                width={400}
                height={200}
                className="rounded-t-lg object-cover w-full h-[150px] "
              />
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Link href={`/dashboard/sites/${item.id}`}>
                    View Articales
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="you dont have any sites created"
          descriptions="You currently dont have any sites . please create some so that you can see them right here."
          buttonText="Create Site"
          herf="/dashboard/sites/new"
        />
      )}
      <h1 className="text-2xl mt-10 font-semibold mb-5">Recent Article</h1>
      {article.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {article.map((item) => (
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
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
                    Edit Articales
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You dont have any aritucles created"
          descriptions="Your currently any articles create.Please create some so that you can see them right here"
          buttonText="Create Article"
          herf={`/dashboard/sites`}
        />
      )}
    </div>
  );
};

export default PageDashBorad;
