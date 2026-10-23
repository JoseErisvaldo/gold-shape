import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type {
  UpdateProductVariantInput,
  UpdateProductVariantParams,
} from "../../schema/productSchema.js";

class UpdateProductVariantService {
  async execute(
    params: UpdateProductVariantParams,
    data: UpdateProductVariantInput,
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

      const variant = await prismaClient.productVariant.findFirst({
        where: {
          id: params.variantId,
          productId: product.id,
        },
        select: {
          id: true,
        },
      });

      if (!variant) {
        throw new AppError("Variação não encontrada", 404);
      }

      if (data.sku) {
        const existingVariant = await prismaClient.productVariant.findFirst({
          where: {
            productId: product.id,
            sku: data.sku,
            id: {
              not: variant.id,
            },
          },
          select: {
            id: true,
          },
        });

        if (existingVariant) {
          throw new AppError("SKU já cadastrado para este produto", 409);
        }
      }

      return await prismaClient.productVariant.update({
        where: {
          id: variant.id,
        },
        data: {
          ...data,
          updatedAt: new Date(),
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
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Erro ao atualizar variação do produto", 500);
    }
  }
}

export { UpdateProductVariantService };
