import express from "express";
import { userController } from "./user.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middleware/auth";
import { FileUploader } from "../../../helpers/fileUploader";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  FileUploader.upload.single("file"),
  userController.createAdmin
);

export const UserRoutes = router;
