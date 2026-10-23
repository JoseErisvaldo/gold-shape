import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type { SearchPublicDeliveryAreasQuery } from "../../schema/publicDeliveryAreaSchema.js";

class SearchPublicDeliveryAreasService {
  async execute(query: SearchPublicDeliveryAreasQuery) {
    try {
      const store = await prismaClient.store.findFirst();

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      const areas = await prismaClient.deliveryArea.findMany({
        where: {
          storeId: store.id,
          active: true,
          ...(query.search
            ? {
                neighborhood: {
                  contains: query.search,
                  mode: "insensitive",
                },
              }
            : {}),
        },
        select: {
          id: true,
          city: true,
          state: true,
          neighborhood: true,
        },
        orderBy: [{ neighborhood: "asc" }, { city: "asc" }, { state: "asc" }],
      });

      return areas.map((area) => ({
        ...area,
        label: `${area.neighborhood} - ${area.city}, ${area.state}`,
      }));
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Erro ao pesquisar áreas de entrega", 500);
    }
  }
}

export { SearchPublicDeliveryAreasService };
