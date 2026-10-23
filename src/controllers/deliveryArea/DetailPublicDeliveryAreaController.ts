import type { Request, Response } from "express";
import { DetailPublicDeliveryAreaService } from "../../services/deliveryArea/DetailPublicDeliveryAreaService.js";
import type { DetailPublicDeliveryAreaParams } from "../../schema/publicDeliveryAreaSchema.js";

class DetailPublicDeliveryAreaController {
  async handle(req: Request, res: Response) {
    const detailPublicDeliveryAreaService =
      new DetailPublicDeliveryAreaService();

    const area = await detailPublicDeliveryAreaService.execute(
      req.params as unknown as DetailPublicDeliveryAreaParams,
    );

    return res.status(200).json(area);
  }
}

export { DetailPublicDeliveryAreaController };
