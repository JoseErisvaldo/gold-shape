import type { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService.js";
import type { CreateCategoryInput } from "../../schema/categorySchema.js";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute(
      req.body as CreateCategoryInput,
    );

    return res.status(201).json(category);
  }
}

export { CreateCategoryController };
