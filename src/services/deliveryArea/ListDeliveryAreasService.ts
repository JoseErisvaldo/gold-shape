import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type { ListDeliveryAreasQuery } from "../../schema/deliveryAreaSchema.js";

class ListDeliveryAreasService {
  async execute(query: ListDeliveryAreasQuery) {
    try {
      const store = await prismaClient.store.findFirst();

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      const { city, neighborhood, page, limit } = query;

      const where = {
        storeId: store.id,
        active: true,
        ...(city
          ? {
              city: {
                contains: city,
                mode: "insensitive" as const,
              },
            }
          : {}),
        ...(neighborhood
          ? {
              neighborhood: {
                contains: neighborhood,
                mode: "insensitive" as const,
              },
            }
          : {}),
      };

      const [deliveryAreas, total] = await prismaClient.$transaction([
        prismaClient.deliveryArea.findMany({
          where,
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
          skip: (page - 1) * limit,
          take: limit,
          orderBy: [{ city: "asc" }, { neighborhood: "asc" }, { id: "asc" }],
        }),
        prismaClient.deliveryArea.count({ where }),
      ]);

      return {
        data: deliveryAreas,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasPreviousPage: page > 1,
          hasNextPage: page * limit < total,
        },
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Erro ao listar áreas de entrega", 500);
    }
  }
}

export { ListDeliveryAreasService };
