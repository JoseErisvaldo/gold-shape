import type { Request, Response } from "express";
import { CreateProductVariantService } from "../../services/product/CreateProductVariantService.js";
import type {
  CreateProductVariantInput,
  CreateProductVariantParams,
} from "../../schema/productSchema.js";

class CreateProductVariantController {
  async handle(req: Request, res: Response) {
    const createProductVariantService = new CreateProductVariantService();

    const variant = await createProductVariantService.execute(
      req.params as unknown as CreateProductVariantParams,
      req.body as CreateProductVariantInput,
    );

    return res.status(201).json(variant);
  }
}

export { CreateProductVariantController };
