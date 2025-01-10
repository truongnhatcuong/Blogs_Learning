import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FileIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function GetUser(userId: string) {
  const data = await prisma.site.findMany({
    where: {
      userId: userId,
    },
  });
  return data;
}
const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }
  const data = await GetUser(user.id);

  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild className="px-3 py-5 bg-blue-500 hover:bg-blue-600">
          <Link href={"/dashboard/sites/new"}>
            <PlusCircle className="size-20" /> Create Site
          </Link>
        </Button>
      </div>
      {data === undefined || data.length == 0 ? (
        <div className="flex flex-col items-center justify-between rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <FileIcon className="size-9 text-blue-600" />
          </div>
          <h2>you dont have any sites created</h2>
          <p className="mb-9 mt-2 text-center leading-tight  text-gray-600 dark:text-gray-200 max-w-sm mx-auto">
            you currently dont have any Sites.Please create some so that you can
            see right here!
          </p>
          <Button asChild className="px-3 py-5 bg-blue-500 hover:bg-blue-600">
            <Link href={"/dashboard/sites/new"}>
              <PlusCircle className="size-20" /> Create Site
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl || "/default.png"}
                alt={item.name}
                width={400}
                height={200}
                className="rounded-t-lg object-cover w-full h-[150px] "
              />
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
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
      )}
    </>
  );
};

export default Page;
