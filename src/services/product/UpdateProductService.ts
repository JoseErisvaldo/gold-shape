import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type { UpdateProductInput } from "../../schema/productSchema.js";

class UpdateProductService {
  async execute(id: string, data: UpdateProductInput) {
    try {
      const store = await prismaClient.store.findFirst();

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      const product = await prismaClient.product.findFirst({
        where: {
          id,
          storeId: store.id,
        },
        select: {
          id: true,
        },
      });

      if (!product) {
        throw new AppError("Produto não encontrado", 404);
      }

      return await prismaClient.product.update({
        where: {
          id: product.id,
        },
        data: {
          ...data,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          name: true,
          description: true,
          brand: true,
          imageUrl: true,
          active: true,
          featured: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Erro ao atualizar produto", 500);
    }
  }
}

export { UpdateProductService };
