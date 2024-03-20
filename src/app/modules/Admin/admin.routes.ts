import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middleware/validateRequest";
import { AdminValidationSchemas } from "./admin.validation";

const router = express.Router();

router.get("/", AdminController.getAllAdminFromDB);
router.get("/:id", AdminController.getAdminByIdFromDB);
router.patch(
  "/:id",
  validateRequest(AdminValidationSchemas.update),
  AdminController.updateAdminById
);
router.delete("/:id", AdminController.deleteAdminFromDB);
router.delete("/soft/:id", AdminController.softDeleteAdminFromDB);

export const AdminRoutes = router;
