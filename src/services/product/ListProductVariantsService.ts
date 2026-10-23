import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type { ListProductVariantsParams } from "../../schema/productSchema.js";

class ListProductVariantsService {
  async execute(params: ListProductVariantsParams) {
    try {
      const store = await prismaClient.store.findFirst();

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      const product = await prismaClient.product.findFirst({
        where: {
          id: params.productId,
          storeId: store.id,
          active: true,
        },
        select: {
          id: true,
        },
      });

      if (!product) {
        throw new AppError("Produto não encontrado", 404);
      }

      const variants = await prismaClient.productVariant.findMany({
        where: {
          productId: product.id,
          active: true,
        },
        select: {
          id: true,
          productId: true,
          sku: true,
          size: true,
          flavor: true,
          price: true,
          discountPercentage: true,
          stockQuantity: true,
          active: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: [{ price: "asc" }, { id: "asc" }],
      });

      return variants;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Erro ao listar variações do produto", 500);
    }
  }
}

export { ListProductVariantsService };
