import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type { DetailPublicDeliveryAreaParams } from "../../schema/publicDeliveryAreaSchema.js";

class DetailPublicDeliveryAreaService {
  async execute(params: DetailPublicDeliveryAreaParams) {
    try {
      const store = await prismaClient.store.findFirst();

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      const area = await prismaClient.deliveryArea.findFirst({
        where: {
          id: params.id,
          storeId: store.id,
          active: true,
        },
        select: {
          id: true,
          city: true,
          state: true,
          neighborhood: true,
          shippingFee: true,
        },
      });

      if (!area) {
        throw new AppError("Área de entrega não encontrada", 404);
      }

      return area;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Erro ao consultar área de entrega", 500);
    }
  }
}

export { DetailPublicDeliveryAreaService };
