import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type { CreateCategoryInput } from "../../schema/categorySchema.js";

class CreateCategoryService {
  async execute(data: CreateCategoryInput) {
    const store = await prismaClient.store.findFirst();

    if (!store) {
      throw new AppError("Loja não encontrada", 404);
    }

    const existingCategory = await prismaClient.category.findUnique({
      where: {
        storeId_slug: {
          storeId: store.id,
          slug: data.slug,
        },
      },
    });

    if (existingCategory) {
      throw new AppError("Já existe uma categoria com esse slug", 409);
    }

    return prismaClient.category.create({
      data: {
        ...data,
        storeId: store.id,
        active: false,
      },
    });
  }
}

export { CreateCategoryService };
