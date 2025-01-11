import { Button } from "@/components/ui/button";
import { FileIcon, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IAppProps {
  title: string;
  descriptions: string;
  buttonText: string;
  herf: string;
}
const EmptyState = ({ buttonText, descriptions, herf, title }: IAppProps) => {
  return (
    <div className="flex flex-col items-center justify-between rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <FileIcon className="size-9 text-blue-600" />
      </div>
      <h2>{title}</h2>
      <p className="mb-9 mt-2 text-center leading-tight  text-gray-600 dark:text-gray-200 max-w-sm mx-auto">
        {descriptions}
      </p>
      <Button asChild className="px-3 py-5 bg-blue-500 hover:bg-blue-600">
        <Link href={herf}>
          <PlusCircle className="size-20" />
          {buttonText}
        </Link>
      </Button>
    </div>
  );
};

export default EmptyState;
