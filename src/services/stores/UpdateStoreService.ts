import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type { UpdateStoreInput } from "../../schema/storeSchema.js";

interface UpdateStoreServiceInput {
  id: string;
  data: UpdateStoreInput;
}

class UpdateStoreService {
  async execute({ id, data }: UpdateStoreServiceInput) {
    const store = await prismaClient.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new AppError("Loja não encontrada", 404);
    }

    if (data.slug && data.slug !== store.slug) {
      const existingStore = await prismaClient.store.findUnique({
        where: { slug: data.slug },
      });

      if (existingStore) {
        throw new AppError("Slug já está em uso", 409);
      }
    }

    return prismaClient.store.update({
      where: { id },
      data,
    });
  }
}

export { UpdateStoreService };
