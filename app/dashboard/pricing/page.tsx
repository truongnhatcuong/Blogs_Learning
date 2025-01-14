import SubmitButtons from "@/app/components/dashboard/SubmitButtons";
import PricingTable from "@/app/components/shared/PricingTable";
import { requireUser } from "@/app/utils/requireUser";
import { stripe } from "@/app/utils/stripe";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import React from "react";

async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      User: {
        select: {
          customerId: true,
        },
      },
    },
  });
  return data;
}

const PricePage = async () => {
  const user = await requireUser();
  const data = await getData(user.id);

  async function createCustomerProtal() {
    "use server";
    const session = await stripe.billingPortal.sessions.create({
      customer: data?.User?.customerId as string,
      return_url: "http://localhost:3000/dashboard",
    });
    return redirect(session.url);
  }

  if (data?.status === "active") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Subscription</CardTitle>
          <CardDescription>
            click on the button below , this will give you the change your
            payment details and view your statement at the same time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCustomerProtal}>
            <SubmitButtons text="View Subscription Details" />
          </form>
        </CardContent>
      </Card>
    );
  }
  return (
    <div>
      <PricingTable />
    </div>
  );
};

export default PricePage;
