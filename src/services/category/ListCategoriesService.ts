import prismaClient from "../../prisma/index.js";
import { AppError } from "../../utils/app-error.js";

class ListCategoriesService {
  async execute() {
    try {
      return await prismaClient.category.findMany({
        orderBy: {
          name: "asc",
        },
      });
    } catch {
      throw new AppError("Erro ao listar categorias", 500);
    }
  }
}

export { ListCategoriesService };
