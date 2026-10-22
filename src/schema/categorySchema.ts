import { z } from "zod";

export const CreateCategorySchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(1, "Name is required").max(100),
      slug: z
        .string()
        .trim()
        .min(1, "Slug is required")
        .max(120)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
      description: z.string().trim().max(500).optional(),
    })
    .strict(),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>["body"];
