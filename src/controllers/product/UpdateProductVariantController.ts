import type { Request, Response } from "express";
import { UpdateProductVariantService } from "../../services/product/UpdateProductVariantService.js";
import type {
  UpdateProductVariantInput,
  UpdateProductVariantParams,
} from "../../schema/productSchema.js";

class UpdateProductVariantController {
  async handle(req: Request, res: Response) {
    const updateProductVariantService = new UpdateProductVariantService();

    const variant = await updateProductVariantService.execute(
      req.params as unknown as UpdateProductVariantParams,
      req.body as UpdateProductVariantInput,
    );

    return res.status(200).json(variant);
  }
}

export { UpdateProductVariantController };
