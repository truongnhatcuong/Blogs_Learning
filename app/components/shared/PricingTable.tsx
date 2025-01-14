import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import React from "react";
import SubmitButtons from "../dashboard/SubmitButtons";
import Link from "next/link";
import { CreateSubscription } from "@/app/actions";
interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Basic",
    cardDescription: "For small teams or office",
    priceTitle: "Free",
    benefits: [
      "1 GB of space",
      "Support at $25/hour",
      "Email support",
      "Help center access",
    ],
  },
  {
    id: 1,
    cardTitle: "Pro",
    cardDescription: "For medium-sized companies",
    priceTitle: "$29",
    benefits: [
      "10 GB of space",
      "Support at $15/hour",
      "Email support",
      "Help center access",
    ],
  },
];

function PricingTable() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center">
        {" "}
        <p className="text-2xl font-semibold text-blue-500">Pricing</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Pricing Plans for everyone and evry budget
        </h1>
      </div>
      <p className="m-auto mt-6 max-w-2xl text-muted-foreground text-center leading-tight">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error dolor
        facilis nulla illo ea incidunt impedit fugiat, ipsum corporis
      </p>
      <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {item.id === 1 ? (
                  <div className="flex items-center justify-between">
                    <h1 className="text-blue-500 ">StartUp</h1>
                    <p className="rounded-full bg-blue-600/20 py-1 px-3 leading-5 text-blue-500 ">
                      Most Popular
                    </p>
                  </div>
                ) : (
                  <>{item.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-3 text-4xl font-semibold tracking-tight">
                {item.priceTitle}
              </p>
              <ul className="mt-8 space-x-3 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3 ">
                    <Check className="text-blue-500 size-5 self-center" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form action={CreateSubscription}>
                  <SubmitButtons
                    text="Buy Now"
                    className="bg-blue-500 hover:bg-blue-600 py-5"
                  />
                </form>
              ) : (
                <Button className="bg-blue-500 hover:bg-blue-600 py-5" asChild>
                  <Link href={"/dashboard"}> Try it Free</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default PricingTable;
