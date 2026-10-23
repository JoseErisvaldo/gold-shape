import type { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService.js";
import type { CreateProductInput } from "../../schema/productSchema.js";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const createProductService = new CreateProductService();

    const product = await createProductService.execute(
      req.body as CreateProductInput,
    );

    return res.status(201).json(product);
  }
}

export { CreateProductController };
