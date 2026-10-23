import { z } from "zod";

const ProductVariantSchema = z
  .object({
    sku: z.string().trim().min(1).max(80),
    size: z.string().trim().max(80).optional(),
    flavor: z.string().trim().max(100).optional(),
    price: z.number().positive(),
    discountPercentage: z.number().min(0).max(100).nullable().optional(),
    stockQuantity: z.number().int().min(0).nullable().optional(),
    active: z.boolean().optional(),
  })
  .strict();

export const CreateProductSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(1).max(180),
      description: z.string().trim().optional(),
      brand: z.string().trim().max(120).optional(),
      imageUrl: z.string().url().nullable().optional(),
      active: z.boolean().optional().default(false),
      featured: z.boolean().optional(),
      categoryIds: z.array(z.string().uuid()).optional(),
      variants: z.array(ProductVariantSchema).min(1),
    })
    .strict()
    .refine(
      (data) =>
        new Set(data.variants.map((variant) => variant.sku)).size ===
        data.variants.length,
      {
        message: "Não pode haver SKUs duplicados no mesmo produto",
        path: ["variants"],
      },
    ),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>["body"];

export const ListProductsSchema = z.object({
  query: z.object({
    search: z.string().trim().optional(),
    categoryId: z.string().uuid().optional(),
    limit: z.coerce.number().int().min(1).max(48).default(12),
    cursor: z.string().uuid().optional(),
    sortBy: z.enum(["name", "createdAt"]).default("name"),
    order: z.enum(["asc", "desc"]).default("asc"),
  }),
});

export type ListProductsQuery = z.infer<typeof ListProductsSchema>["query"];

export const UpdateProductSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z
    .object({
      name: z.string().trim().min(1).max(180).optional(),
      description: z.string().trim().nullable().optional(),
      brand: z.string().trim().max(120).nullable().optional(),
      imageUrl: z.string().url().nullable().optional(),
      active: z.boolean().optional(),
      featured: z.boolean().optional(),
    })
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
      message: "Informe pelo menos um campo para atualizar",
    }),
});

export type UpdateProductParams = z.infer<typeof UpdateProductSchema>["params"];

export type UpdateProductInput = z.infer<typeof UpdateProductSchema>["body"];

export const UpdateProductCategoriesSchema = z.object({
  params: z.object({
    productId: z.string().uuid(),
  }),
  body: z
    .object({
      categoryIds: z
        .array(z.string().uuid())
        .refine((ids) => new Set(ids).size === ids.length, {
          message: "Não pode haver categorias duplicadas",
        }),
    })
    .strict(),
});

export type UpdateProductCategoriesParams = z.infer<
  typeof UpdateProductCategoriesSchema
>["params"];

export type UpdateProductCategoriesInput = z.infer<
  typeof UpdateProductCategoriesSchema
>["body"];

export const CreateProductVariantSchema = z.object({
  params: z.object({
    productId: z.string().uuid(),
  }),
  body: ProductVariantSchema,
});

export type CreateProductVariantParams = z.infer<
  typeof CreateProductVariantSchema
>["params"];

export type CreateProductVariantInput = z.infer<
  typeof CreateProductVariantSchema
>["body"];
