import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";

class DetailProductService {
  async execute(id: string) {
    try {
      const store = await prismaClient.store.findFirst();

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      const product = await prismaClient.product.findFirst({
        where: {
          id,
          storeId: store.id,
          active: true,
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
      });

      if (!product) {
        throw new AppError("Produto não encontrado", 404);
      }

      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Erro ao buscar produto", 500);
    }
  }
}

export { DetailProductService };
