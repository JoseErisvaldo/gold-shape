import type { Request, Response } from "express";
import { SearchPublicDeliveryAreasService } from "../../services/deliveryArea/SearchPublicDeliveryAreasService.js";
import type { SearchPublicDeliveryAreasQuery } from "../../schema/publicDeliveryAreaSchema.js";

class SearchPublicDeliveryAreasController {
  async handle(req: Request, res: Response) {
    const searchPublicDeliveryAreasService =
      new SearchPublicDeliveryAreasService();

    const query = req.query as unknown as SearchPublicDeliveryAreasQuery;
    const areas = await searchPublicDeliveryAreasService.execute(query);

    return res.status(200).json(areas);
  }
}

export { SearchPublicDeliveryAreasController };
