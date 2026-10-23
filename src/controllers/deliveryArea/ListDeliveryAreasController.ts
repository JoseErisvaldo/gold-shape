import type { Request, Response } from "express";
import { ListDeliveryAreasService } from "../../services/deliveryArea/ListDeliveryAreasService.js";
import { ListDeliveryAreasSchema } from "../../schema/deliveryAreaSchema.js";

class ListDeliveryAreasController {
  async handle(req: Request, res: Response) {
    const query = ListDeliveryAreasSchema.shape.query.parse(req.query);
    const listDeliveryAreasService = new ListDeliveryAreasService();

    const deliveryAreas = await listDeliveryAreasService.execute(query);

    return res.status(200).json(deliveryAreas);
  }
}

export { ListDeliveryAreasController };
