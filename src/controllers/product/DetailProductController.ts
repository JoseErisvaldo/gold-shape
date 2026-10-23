import type { Request, Response } from "express";
import { DetailProductService } from "../../services/product/DetailProductService.js";

class DetailProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };

    const service = new DetailProductService();
    const product = await service.execute(id);

    return res.status(200).json(product);
  }
}

export { DetailProductController };
