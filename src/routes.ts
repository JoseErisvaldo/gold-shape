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
import { isAdminOrModerator } from "./middlewares/isAdminOrModerator.js";
import { ListStoresController } from "./controllers/stores/ListStoresController.js";
import { UpdateStoreController } from "./controllers/stores/UpdateStoreController.js";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController.js";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController.js";
import { CreateProductController } from "./controllers/product/CreateProductController.js";
import {
  CreateProductSchema,
  ListProductsSchema,
} from "./schema/productSchema.js";
import { ListProductsController } from "./controllers/product/ListProductsController.js";

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
  isAuthenticated,
  validateSchema(ListProductsSchema),
  new ListProductsController().handle,
);
export default router;
