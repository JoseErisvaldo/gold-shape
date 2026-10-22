import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";

class ListStoresService {
  async execute() {
    const store = await prismaClient.store.findFirst();

    if (!store) {
      throw new AppError("Loja não encontrada", 404);
    }

    return store;
  }
}

export { ListStoresService };
