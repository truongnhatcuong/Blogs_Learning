import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="size-12 rounded-full bg-green-500/30 text-green-500" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full ">
            <h2 className="text-xl font-bold ">Payment SuccessFull</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight">
              Congrast to your subscription. you can now create unlimited sites
            </p>
            <Button className="w-full mt-5" asChild variant="default">
              <Link href={"/dashboard"}>Go Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;
