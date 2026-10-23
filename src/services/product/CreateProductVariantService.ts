import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type {
  CreateProductVariantInput,
  CreateProductVariantParams,
} from "../../schema/productSchema.js";

class CreateProductVariantService {
  async execute(
    params: CreateProductVariantParams,
    data: CreateProductVariantInput,
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

      const existingVariant = await prismaClient.productVariant.findFirst({
        where: {
          productId: product.id,
          sku: data.sku,
        },
        select: {
          id: true,
        },
      });

      if (existingVariant) {
        throw new AppError("SKU já cadastrado para este produto", 409);
      }

      return await prismaClient.productVariant.create({
        data: {
          productId: product.id,
          sku: data.sku,
          size: data.size,
          flavor: data.flavor,
          price: data.price,
          discountPercentage: data.discountPercentage,
          stockQuantity: data.stockQuantity,
          active: data.active,
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

      throw new AppError("Erro ao criar variação do produto", 500);
    }
  }
}

export { CreateProductVariantService };
