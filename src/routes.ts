import { Router } from "express";
import { UpdateCategoryController } from "./controllers/category/UpdateCategoryController.js";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { validateSchema } from "./middlewares/validateSchema.js";
import { CreateUserSchema } from "./schema/userSchema.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";
import { DetailUserController } from "./controllers/user/DetailUserController.js";
import { CreateStoreController } from "./controllers/stores/CreateStoreController.js";
import { CreateStoreSchema, UpdateStoreSchema } from "./schema/storeSchema.js";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "./schema/categorySchema.js";
import { DetailProductController } from "./controllers/product/DetailProductController.js";
import { isAdminOrModerator } from "./middlewares/isAdminOrModerator.js";
import { ListStoresController } from "./controllers/stores/ListStoresController.js";
import { UpdateStoreController } from "./controllers/stores/UpdateStoreController.js";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController.js";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController.js";
import { CreateProductController } from "./controllers/product/CreateProductController.js";
import {
  CreateProductSchema,
  CreateProductVariantSchema,
  ListProductsSchema,
  ListProductVariantsSchema,
  UpdateProductCategoriesSchema,
  UpdateProductSchema,
  UpdateProductVariantSchema,
} from "./schema/productSchema.js";
import { ListProductsController } from "./controllers/product/ListProductsController.js";
import { UpdateProductController } from "./controllers/product/UpdateProductController.js";
import { UpdateProductCategoriesController } from "./controllers/product/UpdateProductCategoriesController.js";
import { CreateProductVariantController } from "./controllers/product/CreateProductVariantController.js";
import { ListProductVariantsController } from "./controllers/product/ListProductVariantsController.js";
import { UpdateProductVariantController } from "./controllers/product/UpdateProductVariantController.js";
import { CreateDeliveryAreaController } from "./controllers/deliveryArea/CreateDeliveryAreaController.js";
import {
  CreateDeliveryAreaSchema,
  ListDeliveryAreasSchema,
  UpdateDeliveryAreaSchema,
} from "./schema/deliveryAreaSchema.js";
import { ListDeliveryAreasController } from "./controllers/deliveryArea/ListDeliveryAreasController.js";
import { DetailPublicDeliveryAreaController } from "./controllers/deliveryArea/DetailPublicDeliveryAreaController.js";
import {
  DetailPublicDeliveryAreaSchema,
  SearchPublicDeliveryAreasSchema,
} from "./schema/publicDeliveryAreaSchema.js";
import { SearchPublicDeliveryAreasController } from "./controllers/deliveryArea/SearchPublicDeliveryAreasController.js";
import { UpdateDeliveryAreaController } from "./controllers/deliveryArea/UpdateDeliveryAreaController.js";

const router = Router();

router.get("/", (_, res) => {
  res.json({ status: "ok", health: "/health" });
});

router.get("/health", (_, res) => {
  res.send("OK");
});

router.get("/me", isAuthenticated, new DetailUserController().handle);

router.post(
  "/users",
  validateSchema(CreateUserSchema),
  new CreateUserController().handle,
);

router.post("/session", new AuthUserController().handle);

router.post(
  "/stores",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(CreateStoreSchema),
  new CreateStoreController().handle,
);

router.get("/stores", isAuthenticated, new ListStoresController().handle);

router.patch(
  "/store/:id",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(UpdateStoreSchema),
  new UpdateStoreController().handle,
);

router.post(
  "/categories",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(CreateCategorySchema),
  new CreateCategoryController().handle,
);

router.get(
  "/categories",
  isAuthenticated,
  new ListCategoriesController().handle,
);

router.patch(
  "/categories/:id",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(UpdateCategorySchema),
  new UpdateCategoryController().handle,
);

router.post(
  "/products",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(CreateProductSchema),
  new CreateProductController().handle,
);

router.get(
  "/products",
  validateSchema(ListProductsSchema),
  new ListProductsController().handle,
);

router.get("/products/:id", new DetailProductController().handle);

router.patch(
  "/products/:id",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(UpdateProductSchema),
  new UpdateProductController().handle,
);

router.put(
  "/products/:productId/categories",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(UpdateProductCategoriesSchema),
  new UpdateProductCategoriesController().handle,
);

router.post(
  "/products/:productId/variants",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(CreateProductVariantSchema),
  new CreateProductVariantController().handle,
);

router.get(
  "/products/:productId/variants",
  validateSchema(ListProductVariantsSchema),
  new ListProductVariantsController().handle,
);

router.patch(
  "/products/:productId/variants/:variantId",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(UpdateProductVariantSchema),
  new UpdateProductVariantController().handle,
);

router.post(
  "/delivery-areas",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(CreateDeliveryAreaSchema),
  new CreateDeliveryAreaController().handle,
);

router.get(
  "/delivery-areas",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(ListDeliveryAreasSchema),
  new ListDeliveryAreasController().handle,
);

router.get(
  "/public/delivery-areas",
  validateSchema(SearchPublicDeliveryAreasSchema),
  new SearchPublicDeliveryAreasController().handle,
);

router.get(
  "/public/delivery-areas/:id",
  validateSchema(DetailPublicDeliveryAreaSchema),
  new DetailPublicDeliveryAreaController().handle,
);

router.patch(
  "/delivery-areas/:id",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(UpdateDeliveryAreaSchema),
  new UpdateDeliveryAreaController().handle,
);

export default router;
