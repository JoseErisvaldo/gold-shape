import type { Request, Response } from "express";
import { UpdateProductCategoriesService } from "../../services/product/UpdateProductCategoriesService.js";
import type {
  UpdateProductCategoriesInput,
  UpdateProductCategoriesParams,
} from "../../schema/productSchema.js";

class UpdateProductCategoriesController {
  async handle(req: Request, res: Response) {
    const updateProductCategoriesService = new UpdateProductCategoriesService();

    const product = await updateProductCategoriesService.execute(
      req.params as unknown as UpdateProductCategoriesParams,
      req.body as UpdateProductCategoriesInput,
    );

    return res.status(200).json(product);
  }
}

export { UpdateProductCategoriesController };
