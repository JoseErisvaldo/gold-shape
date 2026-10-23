import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type {
  UpdateDeliveryAreaInput,
  UpdateDeliveryAreaParams,
} from "../../schema/deliveryAreaSchema.js";

class UpdateDeliveryAreaService {
  async execute(
    params: UpdateDeliveryAreaParams,
    data: UpdateDeliveryAreaInput,
  ) {
    try {
      const store = await prismaClient.store.findFirst();

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      const area = await prismaClient.deliveryArea.findFirst({
        where: {
          id: params.id,
          storeId: store.id,
        },
      });

      if (!area) {
        throw new AppError("Área de entrega não encontrada", 404);
      }

      const city = data.city ?? area.city;
      const state = data.state ?? area.state;
      const neighborhood = data.neighborhood ?? area.neighborhood;

      const existingArea = await prismaClient.deliveryArea.findFirst({
        where: {
          storeId: store.id,
          id: { not: area.id },
          state,
          city: {
            equals: city,
            mode: "insensitive",
          },
          neighborhood: {
            equals: neighborhood,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
        },
      });

      if (existingArea) {
        throw new AppError("Área de entrega já cadastrada", 409);
      }

      return await prismaClient.deliveryArea.update({
        where: {
          id: area.id,
        },
        data,
        select: {
          id: true,
          storeId: true,
          city: true,
          state: true,
          neighborhood: true,
          shippingFee: true,
          active: true,
          createdAt: true,
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Erro ao atualizar área de entrega", 500);
    }
  }
}

export { UpdateDeliveryAreaService };
