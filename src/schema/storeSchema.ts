import { z } from "zod";

export const CreateStoreSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(1, "Name is required").max(150),
      slug: z
        .string()
        .trim()
        .min(1, "Slug is required")
        .max(160)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
      whatsapp: z.string().trim().min(1, "WhatsApp is required").max(20),
    })
    .strict(),
});

export type CreateStoreInput = z.infer<typeof CreateStoreSchema>["body"];
