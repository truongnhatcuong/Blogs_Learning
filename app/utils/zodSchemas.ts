import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const siteSchema = z.object({
  name: z.string().min(1).max(35),
  description: z.string().min(1).max(255),
  subdirectory: z.string().min(1).max(50),
});

export const PostSchema = z.object({
  title: z.string().min(1).max(100),
  articleContent: z.string().min(1),
  smallDescription: z.string().min(1).max(255),
  coverImage: z.string().min(1),
  slug: z.string().min(1).max(255),
});

export function SiteCreateSchema(options?: {
  isSubdirectoryUnique: () => Promise<boolean>;
}) {
  return z.object({
    subdirectory: z
      .string()
      .min(1)
      .max(40)
      .regex(/^[a-z]+$/, "Subdirectory must only use lowercase letters.")
      .transform((value) => value.toLocaleLowerCase())
      .pipe(
        z.string().superRefine((email, ctx) => {
          if (typeof options?.isSubdirectoryUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }
          return options.isSubdirectoryUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "subdirectiry is alredy taken...",
              });
            }
          });
        })
      ),
    name: z.string().min(1).max(35),
    description: z.string().min(1).max(255),
  });
}
