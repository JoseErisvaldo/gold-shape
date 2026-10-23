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

export const UpdateCategorySchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, "ID da categoria é obrigatório"),
  }),
  body: z
    .object({
      name: z.string().trim().min(1).max(100).optional(),
      slug: z
        .string()
        .trim()
        .min(1)
        .max(120)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .optional(),
      description: z.string().trim().max(500).nullable().optional(),
      active: z.boolean().optional(),
    })
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
      message: "Informe pelo menos um campo para atualizar",
    }),
});

export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>["body"];

export type UpdateCategoryParams = z.infer<
  typeof UpdateCategorySchema
>["params"];
