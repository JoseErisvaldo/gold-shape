import type { Request, Response } from "express";
import { ListCategoriesService } from "../../services/category/ListCategoriesService.js";

class ListCategoriesController {
  async handle(_req: Request, res: Response) {
    const listCategoriesService = new ListCategoriesService();
    const categories = await listCategoriesService.execute();

    return res.status(200).json(categories);
  }
}

export { ListCategoriesController };
