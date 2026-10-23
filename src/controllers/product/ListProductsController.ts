import type { Request, Response } from "express";
import { ListProductsService } from "../../services/product/ListProductsService.js";
import { ListProductsSchema } from "../../schema/productSchema.js";

class ListProductsController {
  async handle(req: Request, res: Response) {
    const { query } = ListProductsSchema.parse({
      query: req.query,
    });

    const listProductsService = new ListProductsService();
    const result = await listProductsService.execute(query);

    return res.status(200).json(result);
  }
}

export { ListProductsController };
