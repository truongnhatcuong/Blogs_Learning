"use client";
import { CreatePostAction } from "@/app/actions";
import TailwindEditor from "@/app/components/dashboard/EditorWrapper";
import { UploadDropzone } from "@/app/utils/uploadthing";
import { PostSchema } from "@/app/utils/zodSchemas";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ArrowLeft, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import React, { useActionState, useState } from "react";
import { toast } from "sonner";
import slugify from "react-slugify";
import SubmitButtons from "@/app/components/dashboard/SubmitButtons";
export default function AricleCreate({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = React.use(params);

  const [image, setImage] = useState<undefined | string>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined) || "";
  const [lastResult, action] = useActionState(CreatePostAction, undefined);
  const [title, setTitle] = useState<undefined | string>("");
  const [slug, setSlugValue] = useState<undefined | string>("");

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PostSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function handleSlugGeneration() {
    const titleInput = title;
    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error("please create a title firts");
    }
    setSlugValue(slugify(titleInput));

    return toast.success("slug have been create success");
  }
  return (
    <>
      <div className="flex items-center ">
        <Button size={"icon"} variant={"outline"} className="mr-2" asChild>
          <Link href={`/dashboard/sites/${siteId}`}>
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold ">Create Ariticle </h1>
      </div>
      <Card>
        <CardTitle className="my-3 text-center text-2xl">
          Articel Details
        </CardTitle>
        <CardDescription className="text-sm text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </CardDescription>
        <CardContent>
          <form
            className="flex flex-col gap-6 mt-3 "
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
          >
            <Input type="hidden" name="siteId" value={siteId} />
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                placeholder="Nextjs blogging application"
                key={fields.title.key}
                name={fields.title.name}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                placeholder="Article slug"
                key={fields.slug.key}
                name={fields.slug.name}
                defaultValue={fields.slug.initialValue}
                onChange={(e) => setSlugValue(e.target.value)}
                value={slug}
              />
              <Button
                variant={"secondary"}
                type="button"
                className="w-fit"
                onClick={handleSlugGeneration}
              >
                <Atom className="size-4 mr-2" />
                Generate Slug
              </Button>
              <p className="text-red-500 text-sm">{fields.slug.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label>Small Description</Label>
              <Textarea
                placeholder="small description for your blof article..."
                className="h-32"
                key={fields.smallDescription.key}
                name={fields.smallDescription.name}
                defaultValue={fields.smallDescription.initialValue}
              />
              <p className="text-red-500 text-sm">
                {fields.smallDescription.errors}
              </p>
            </div>
            <div className="grid gap-2">
              <Label>Cover Images</Label>

              {image ? (
                <div className="flex justify-center border">
                  <Input
                    type="hidden"
                    key={fields.coverImage.key}
                    name={fields.coverImage.name}
                    defaultValue={fields.coverImage.initialValue}
                    value={image}
                  />
                  <Image
                    src={image}
                    alt="ImageUploader"
                    width={200}
                    height={200}
                    className="object-contain w-[150px] h-[150px] rounded-lg  "
                  />
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImage(res[0].url);
                    toast.success("Image uploaded Success");
                  }}
                  onUploadError={() => {
                    toast.error("uploaded error");
                  }}
                />
              )}
              <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label>Article Content</Label>
              <Input
                type="hidden"
                key={fields.articleContent.key}
                name={fields.articleContent.name}
                defaultValue={JSON.stringify(value) || undefined}
              />
              <TailwindEditor onChange={setValue} initialValue={value} />
              <p className="text-red-500 text-sm">
                {fields.articleContent.errors}
              </p>
            </div>
            <SubmitButtons
              text="Create Article"
              className="bg-blue-500 hover:bg-blue-700"
            />
          </form>
        </CardContent>
      </Card>
    </>
  );
}
