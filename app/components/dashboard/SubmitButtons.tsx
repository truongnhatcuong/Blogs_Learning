"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface IAppProps {
  text: string;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}
const SubmitButtons = ({ text, className, variant }: IAppProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className={cn("w-full", className)}>
          <Loader2 className="mr-1.5 size-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button className={cn("w-fit", className)} variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
};

export default SubmitButtons;
