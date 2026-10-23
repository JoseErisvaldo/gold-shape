import { z } from "zod";

export const CreateDeliveryAreaSchema = z.object({
  body: z
    .object({
      city: z.string().trim().min(1).max(120),
      state: z
        .string()
        .trim()
        .length(2)
        .transform((value) => value.toUpperCase()),
      neighborhood: z.string().trim().min(1).max(120),
      shippingFee: z.number().min(0),
      active: z.boolean().default(true),
    })
    .strict(),
});

export type CreateDeliveryAreaInput = z.infer<
  typeof CreateDeliveryAreaSchema
>["body"];

export const ListDeliveryAreasSchema = z.object({
  query: z.object({
    city: z.string().trim().min(1).optional(),
    neighborhood: z.string().trim().min(1).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(48).default(12),
  }),
});

export type ListDeliveryAreasQuery = z.infer<
  typeof ListDeliveryAreasSchema
>["query"];
