import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Hero from "./components/frontend/Hero";
import Logos from "./components/frontend/Logos";
import Features from "./components/frontend/Features";
import { redirect } from "next/navigation";
import PricingTable from "./components/shared/PricingTable";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const sesson = await getUser();

  if (sesson?.id) {
    return redirect("/dashboard");
  }
  return (
    <div
      className="max-w-7xl
     mx-auto px-4 sm:px-6 lg:px-8 mb-24"
    >
      <Hero />
      <Logos />
      <Features />
      <PricingTable />
    </div>
  );
}
