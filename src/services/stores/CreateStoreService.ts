import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type { CreateStoreInput } from "../../schema/storeSchema.js";

class CreateStoreService {
  async execute(data: CreateStoreInput) {
    const existingStore = await prismaClient.store.findFirst();

    if (existingStore) {
      throw new AppError("Já existe uma loja cadastrada", 409);
    }

    return prismaClient.store.create({
      data,
    });
  }
}

export { CreateStoreService };
