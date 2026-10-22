import type { Request, Response } from "express";
import { ListStoresService } from "../../services/stores/ListStoresService.js";

class ListStoresController {
  async handle(_req: Request, res: Response) {
    const listStoresService = new ListStoresService();
    const store = await listStoresService.execute();

    return res.status(200).json(store);
  }
}

export { ListStoresController };
