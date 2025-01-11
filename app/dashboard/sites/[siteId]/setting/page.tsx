import { DeleteSite } from "@/app/actions";
import SubmitButtons from "@/app/components/dashboard/SubmitButtons";
import UploadImageForm from "@/app/components/form/UploadImageForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = ({ params }: { params: Promise<{ siteId: string }> }) => {
  const { siteId } = React.use(params);

  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href={`/dashboard/sites/${siteId}`}>
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
      </div>
      <UploadImageForm siteId={siteId} />
      <Card className="border-red-500 bg-red-500/10">
        <CardHeader>
          <CardTitle>Danger</CardTitle>
          <CardDescription>
            This will delete yout site and all articles associated with it.
            Click the button beloew to delete everything
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={DeleteSite}>
            <Input type="hidden" name="siteId" value={siteId} />
            <SubmitButtons text="Delete EveryThing" variant={"destructive"} />
          </form>
        </CardFooter>
      </Card>
    </>
  );
};

export default Page;
