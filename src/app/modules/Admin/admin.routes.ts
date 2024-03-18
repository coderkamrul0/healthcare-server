import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/", AdminController.getAllAdminFromDB);
router.get("/:id", AdminController.getAdminByIdFromDB);
router.patch("/:id", AdminController.updateAdminById);
router.delete("/:id", AdminController.deleteAdminFromDB);
router.delete("/soft/:id", AdminController.softDeleteAdminFromDB);

export const AdminRoutes = router;
