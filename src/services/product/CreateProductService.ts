import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type { CreateProductInput } from "../../schema/productSchema.js";

class CreateProductService {
  async execute(data: CreateProductInput) {
    try {
      const store = await prismaClient.store.findFirst();

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      const { categoryIds = [], variants, ...productData } = data;

      if (categoryIds.length > 0) {
        const categories = await prismaClient.category.findMany({
          where: {
            id: {
              in: categoryIds,
            },
            storeId: store.id,
          },
          select: {
            id: true,
          },
        });

        if (categories.length !== new Set(categoryIds).size) {
          throw new AppError(
            "Uma ou mais categorias não foram encontradas",
            400,
          );
        }
      }

      return await prismaClient.product.create({
        data: {
          ...productData,
          storeId: store.id,
          variants: {
            create: variants,
          },
          categories: {
            create: [...new Set(categoryIds)].map((categoryId) => ({
              category: {
                connect: {
                  id: categoryId,
                },
              },
            })),
          },
        },
        include: {
          variants: true,
          categories: {
            include: {
              category: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Erro ao criar produto", 500);
    }
  }
}

export { CreateProductService };
