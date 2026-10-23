import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type { CreateDeliveryAreaInput } from "../../schema/deliveryAreaSchema.js";

class CreateDeliveryAreaService {
  async execute(data: CreateDeliveryAreaInput) {
    try {
      const store = await prismaClient.store.findFirst();

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      const existingArea = await prismaClient.deliveryArea.findFirst({
        where: {
          storeId: store.id,
          city: {
            equals: data.city,
            mode: "insensitive",
          },
          state: data.state,
          neighborhood: {
            equals: data.neighborhood,
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

      return await prismaClient.deliveryArea.create({
        data: {
          storeId: store.id,
          city: data.city,
          state: data.state,
          neighborhood: data.neighborhood,
          shippingFee: data.shippingFee,
          ...(data.active !== undefined ? { active: data.active } : {}),
        },
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

      throw new AppError("Erro ao criar área de entrega", 500);
    }
  }
}

export { CreateDeliveryAreaService };
