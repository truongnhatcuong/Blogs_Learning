"use client";
import { CreateSiteAction } from "@/app/actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "@/app/utils/zodSchemas";
import SubmitButtons from "@/app/components/dashboard/SubmitButtons";

const CreatePage = () => {
  const [lastResult, action] = useActionState(CreateSiteAction, undefined);

  // Kiểm tra và chuyển đổi kiểu của lastResult

  const [form, field] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: siteSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
      <div className="flex flex-col flex-1 items-center justify-center">
        <Card className="w-max-[450px]">
          <CardHeader>
            <CardTitle>Create Site</CardTitle>
            <CardDescription>
              Create your site here. Click the button below once your done...
            </CardDescription>
          </CardHeader>
          <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <CardContent>
              <div className="flex flex-col gap-y-6 ">
                <div className="grid gap-2">
                  <Label>Site name</Label>
                  <Input
                    placeholder="site Name"
                    name={String(field.name.name)}
                    key={field.name.key}
                    defaultValue={field.name.initialValue}
                  />
                  <p className="text-xs text-red-500">{field.name.errors}</p>
                </div>
                <div className="grid gap-2">
                  <Label>Subdirectory</Label>
                  <Input
                    placeholder="Subdirectory"
                    name={String(field.subdirectory.name)}
                    key={field.subdirectory.key}
                    defaultValue={field.subdirectory.initialValue}
                  />
                  <p className="text-xs text-red-500">
                    {field.subdirectory.errors}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label>Decription</Label>
                  <Textarea
                    placeholder="small description for your site"
                    cols={19}
                    name={String(field.description.name)}
                    key={field.description.key}
                    defaultValue={field.description.initialValue}
                  />
                  <p className="text-xs text-red-500">
                    {field.description.errors}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButtons
                text="Create Site"
                className="bg-blue-500 hover:bg-blue-700 py-5"
              />
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreatePage;
