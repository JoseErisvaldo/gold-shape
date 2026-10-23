import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";
import type {
  UpdateCategoryInput,
  UpdateCategoryParams,
} from "../../schema/categorySchema.js";

class UpdateCategoryService {
  async execute({ id }: UpdateCategoryParams, data: UpdateCategoryInput) {
    try {
      const store = await prismaClient.store.findFirst();

      if (!store) {
        throw new AppError("Loja não encontrada", 404);
      }

      const category = await prismaClient.category.findFirst({
        where: {
          id,
          storeId: store.id,
        },
      });

      if (!category) {
        throw new AppError("Categoria não encontrada", 404);
      }

      if (data.slug) {
        const existingCategory = await prismaClient.category.findFirst({
          where: {
            storeId: store.id,
            slug: data.slug,
            id: {
              not: id,
            },
          },
        });

        if (existingCategory) {
          throw new AppError("Já existe uma categoria com esse slug", 409);
        }
      }

      return await prismaClient.category.update({
        where: {
          id: category.id,
        },
        data,
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Erro ao atualizar categoria", 500);
    }
  }
}

export { UpdateCategoryService };
