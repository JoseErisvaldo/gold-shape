import type { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService.js";
import type { UpdateProductInput } from "../../schema/productSchema.js";

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const updateProductService = new UpdateProductService();

    const product = await updateProductService.execute(
      req.params.id as string,
      req.body as UpdateProductInput,
    );

    return res.status(200).json(product);
  }
}

export { UpdateProductController };
