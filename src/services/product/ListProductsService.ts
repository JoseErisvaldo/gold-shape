import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type { ListProductsQuery } from "../../schema/productSchema.js";

class ListProductsService {
  async execute(query: ListProductsQuery) {
    try {
      const store = await prismaClient.store.findFirst();

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      const { search, categoryId, limit, cursor, sortBy, order } = query;

      const products = await prismaClient.product.findMany({
        where: {
          storeId: store.id,
          active: true,
          ...(search
            ? {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              }
            : {}),
          ...(categoryId
            ? {
                categories: {
                  some: {
                    categoryId,
                    category: {
                      active: true,
                    },
                  },
                },
              }
            : {}),
        },
        select: {
          id: true,
          name: true,
          description: true,
          brand: true,
          imageUrl: true,
          active: true,
          featured: true,
          variants: {
            where: {
              active: true,
            },
            select: {
              id: true,
              sku: true,
              size: true,
              flavor: true,
              price: true,
              discountPercentage: true,
              stockQuantity: true,
              active: true,
            },
            orderBy: {
              price: "asc",
            },
          },
          categories: {
            where: {
              category: {
                active: true,
              },
            },
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  description: true,
                  active: true,
                },
              },
            },
          },
        },
        ...(cursor
          ? {
              cursor: {
                id: cursor,
              },
              skip: 1,
            }
          : {}),
        take: limit + 1,
        orderBy:
          sortBy === "name"
            ? [{ name: order }, { id: order }]
            : [{ createdAt: order }, { id: order }],
      });

      const hasMore = products.length > limit;
      const data = hasMore ? products.slice(0, limit) : products;
      const lastProduct = data[data.length - 1];

      return {
        data,
        pagination: {
          nextCursor: hasMore && lastProduct ? lastProduct.id : null,
          hasMore,
        },
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Erro ao listar produtos", 500);
    }
  }
}

export { ListProductsService };
