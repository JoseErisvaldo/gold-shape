import type { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/category/UpdateCategoryService.js";
import type {
  UpdateCategoryInput,
  UpdateCategoryParams,
} from "../../schema/categorySchema.js";

class UpdateCategoryController {
  async handle(req: Request, res: Response) {
    const updateCategoryService = new UpdateCategoryService();

    const category = await updateCategoryService.execute(
      req.params as unknown as UpdateCategoryParams,
      req.body as UpdateCategoryInput,
    );

    return res.status(200).json(category);
  }
}

export { UpdateCategoryController };
