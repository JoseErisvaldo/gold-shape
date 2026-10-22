import type { Request, Response } from "express";
import type { UpdateStoreInput } from "../../schema/storeSchema.js";
import { UpdateStoreSchema } from "../../schema/storeSchema.js";
import { UpdateStoreService } from "../../services/stores/UpdateStoreService.js";

class UpdateStoreController {
  async handle(req: Request, res: Response) {
    const { id } = UpdateStoreSchema.shape.params.parse(req.params);
    const data = req.body as UpdateStoreInput;

    const updateStoreService = new UpdateStoreService();

    const store = await updateStoreService.execute({
      id,
      data,
    });

    return res.status(200).json(store);
  }
}

export { UpdateStoreController };
