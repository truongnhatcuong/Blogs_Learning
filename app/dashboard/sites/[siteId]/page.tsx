import EmptyState from "@/app/components/dashboard/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Book, MoreHorizontal, PlusCircle, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

async function getData(userId: string, siteId: string) {
  const data = prisma.site.findUnique({
    where: {
      id: siteId,
      userId: userId,
    },
    select: {
      subdirectory: true,
      posts: {
        select: {
          id: true,
          image: true,
          title: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
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
          <Link href={`/blog/${data?.subdirectory}`}>
            <Book />
            View Blogs
          </Link>
        </Button>
        <Button asChild variant={"secondary"} className="hover:bg-black/10">
          <Link href={`/dashboard/sites/${siteId}/setting`}>
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
      {data === undefined || data?.posts.length === 0 ? (
        <EmptyState
          title="you dont have any acrticle created"
          descriptions="you currently dont have any Sites.Please create some so that you can
        see right here !"
          buttonText="Create Article"
          herf={`/dashboard/sites/${siteId}/create`}
        />
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Articles</CardTitle>
              <CardDescription>
                Magane your articels in a simple and ontuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.posts.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={64}
                          height={64}
                          className="size-16 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="truncate">{item.title}</TableCell>

                      <TableCell>
                        <Badge
                          variant={"outline"}
                          className="bg-green-500/10 text-green-500 "
                        >
                          Published
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("vn-VN", {
                          dateStyle: "medium",
                        }).format(item.createdAt)}
                      </TableCell>
                      <TableCell className="text-right ">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              className="mr-3.5"
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="center"
                            className="text-center  "
                          >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link
                              href={`/dashboard/sites/${siteId}/${item.id}`}
                            >
                              <DropdownMenuLabel className="hover:bg-black/10 cursor-pointer">
                                {" "}
                                Edit
                              </DropdownMenuLabel>
                            </Link>
                            <Link
                              href={`/dashboard/sites/${siteId}/${item.id}/delete`}
                            >
                              <DropdownMenuLabel className="hover:bg-black/10 cursor-pointer">
                                Delete
                              </DropdownMenuLabel>
                            </Link>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
