import { DeletePost } from "@/app/actions";
import SubmitButtons from "@/app/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const Page = async ({
  params,
}: {
  params: { articleId: string; siteId: string };
}) => {
  const { articleId, siteId } = await params;
  return (
    <div className="flex flex-1 items-center justify-center ">
      <Card className="max-w-xl ">
        <CardHeader>
          <CardTitle className="text-center my-2 text-2xl">
            Are You Sure ?
          </CardTitle>
          <CardDescription>
            This action cannot be undone. This will delete this article and
            remove all data form out server
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button
            className=" hover:bg-blue-600 w-fit"
            variant={"secondary"}
            asChild
          >
            <Link href={`dashboard/sites/${siteId}`}> Cancel</Link>
          </Button>
          <form action={DeletePost}>
            <Input type="hidden" value={siteId} name="siteId" />
            <Input type="hidden" value={articleId} name="articleId" />
            <SubmitButtons
              text=" Delete Articel"
              variant={"destructive"}
              className="w-fit"
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
