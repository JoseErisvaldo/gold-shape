import type { Request, Response } from "express";
import { CreateStoreService } from "../../services/stores/CreateStoreService.js";

class CreateStoreController {
  async handle(req: Request, res: Response) {
    const createStoreService = new CreateStoreService();

    const store = await createStoreService.execute(req.body);

    return res.status(201).json(store);
  }
}

export { CreateStoreController };
