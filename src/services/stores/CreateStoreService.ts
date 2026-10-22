import prismaClient from "../../prisma/index.js";
import { CreateStoreInput } from "../../schema/storeSchema.js";
import { AppError } from "../../utils/app-error.js";

class CreateStoreService {
  async execute(data: CreateStoreInput) {
    const existingStore = await prismaClient.store.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingStore) {
      throw new AppError("Slug já está em uso", 409);
    }

    return prismaClient.store.create({
      data: {
        name: data.name,
        slug: data.slug,
        whatsapp: data.whatsapp,
      },
    });
  }
}

export { CreateStoreService };
