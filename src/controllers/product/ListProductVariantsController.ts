import type { Request, Response } from "express";
import { ListProductVariantsService } from "../../services/product/ListProductVariantsService.js";
import type { ListProductVariantsParams } from "../../schema/productSchema.js";

class ListProductVariantsController {
  async handle(req: Request, res: Response) {
    const listProductVariantsService = new ListProductVariantsService();

    const variants = await listProductVariantsService.execute(
      req.params as unknown as ListProductVariantsParams,
    );

    return res.status(200).json(variants);
  }
}

export { ListProductVariantsController };
