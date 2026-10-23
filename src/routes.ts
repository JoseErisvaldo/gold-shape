import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { validateSchema } from "./middlewares/validateSchema.js";
import { CreateUserSchema } from "./schema/userSchema.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";
import { DetailUserController } from "./controllers/user/DetailUserController.js";
import { CreateStoreController } from "./controllers/stores/CreateStoreController.js";
import { CreateStoreSchema, UpdateStoreSchema } from "./schema/storeSchema.js";
import { CreateCategorySchema } from "./schema/categorySchema.js";
import { isAdminOrModerator } from "./middlewares/isAdminOrModerator.js";
import { ListStoresController } from "./controllers/stores/ListStoresController.js";
import { UpdateStoreController } from "./controllers/stores/UpdateStoreController.js";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController.js";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController.js";

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
  validateSchema(CreateCategorySchema),
  new CreateCategoryController().handle,
);

router.get(
  "/categories",
  isAuthenticated,
  new ListCategoriesController().handle,
);

export default router;
