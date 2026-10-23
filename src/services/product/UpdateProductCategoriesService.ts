import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type {
  UpdateProductCategoriesInput,
  UpdateProductCategoriesParams,
} from "../../schema/productSchema.js";

class UpdateProductCategoriesService {
  async execute(
    params: UpdateProductCategoriesParams,
    data: UpdateProductCategoriesInput,
  ) {
    try {
      const store = await prismaClient.store.findFirst();

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      const product = await prismaClient.product.findFirst({
        where: {
          id: params.productId,
          storeId: store.id,
        },
        select: {
          id: true,
        },
      });

      if (!product) {
        throw new AppError("Produto não encontrado", 404);
      }

      const categories = await prismaClient.category.findMany({
        where: {
          id: {
            in: data.categoryIds,
          },
          storeId: store.id,
          active: true,
        },
        select: {
          id: true,
        },
      });

      if (categories.length !== data.categoryIds.length) {
        throw new AppError(
          "Uma ou mais categorias não foram encontradas ou estão inativas",
          400,
        );
      }

      return await prismaClient.$transaction(async (transaction) => {
        await transaction.productCategory.deleteMany({
          where: {
            productId: product.id,
          },
        });

        if (data.categoryIds.length > 0) {
          await transaction.productCategory.createMany({
            data: data.categoryIds.map((categoryId) => ({
              productId: product.id,
              categoryId,
            })),
          });
        }

        return transaction.product.findUnique({
          where: {
            id: product.id,
          },
          select: {
            id: true,
            name: true,
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
        });
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Erro ao atualizar categorias do produto", 500);
    }
  }
}

export { UpdateProductCategoriesService };
