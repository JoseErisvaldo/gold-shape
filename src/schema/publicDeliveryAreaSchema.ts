import { z } from "zod";

export const SearchPublicDeliveryAreasSchema = z.object({
  query: z.object({
    search: z.string().trim().optional(),
  }),
});

export type SearchPublicDeliveryAreasQuery = z.infer<
  typeof SearchPublicDeliveryAreasSchema
>["query"];

export const DetailPublicDeliveryAreaSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type DetailPublicDeliveryAreaParams = z.infer<
  typeof DetailPublicDeliveryAreaSchema
>["params"];
