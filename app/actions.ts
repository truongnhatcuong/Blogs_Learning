"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseWithZod } from "@conform-to/zod";
import { PostSchema, siteSchema } from "./utils/zodSchemas";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { requireUser } from "./utils/requireUser";

export async function CreateSiteAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submisson = parseWithZod(formData, {
    schema: siteSchema,
  });
  if (submisson.status !== "success") {
    return submisson.reply();
  }
  await prisma.site.create({
    data: {
      description: submisson.value.description,
      name: submisson.value.name,
      subdirectory: submisson.value.subdirectory,
      userId: user.id,
    },
  });
  return redirect("/dashboard/sites");
}

export async function CreatePostAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.post.create({
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.smallDescription,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
      userId: user.id,
      siteId: formData.get("siteId") as string,
    },
  });
  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}
