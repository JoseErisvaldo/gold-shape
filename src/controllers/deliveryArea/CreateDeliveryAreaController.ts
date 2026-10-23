import type { Request, Response } from "express";
import { CreateDeliveryAreaService } from "../../services/deliveryArea/CreateDeliveryAreaService.js";
import type { CreateDeliveryAreaInput } from "../../schema/deliveryAreaSchema.js";

class CreateDeliveryAreaController {
  async handle(req: Request, res: Response) {
    const createDeliveryAreaService = new CreateDeliveryAreaService();

    const deliveryArea = await createDeliveryAreaService.execute(
      req.body as CreateDeliveryAreaInput,
    );

    return res.status(201).json(deliveryArea);
  }
}

export { CreateDeliveryAreaController };
