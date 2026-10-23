import type { Request, Response } from "express";
import { UpdateDeliveryAreaService } from "../../services/deliveryArea/UpdateDeliveryAreaService.js";
import type {
  UpdateDeliveryAreaInput,
  UpdateDeliveryAreaParams,
} from "../../schema/deliveryAreaSchema.js";

class UpdateDeliveryAreaController {
  async handle(req: Request, res: Response) {
    const updateDeliveryAreaService = new UpdateDeliveryAreaService();

    const area = await updateDeliveryAreaService.execute(
      req.params as unknown as UpdateDeliveryAreaParams,
      req.body as UpdateDeliveryAreaInput,
    );

    return res.status(200).json(area);
  }
}

export { UpdateDeliveryAreaController };
