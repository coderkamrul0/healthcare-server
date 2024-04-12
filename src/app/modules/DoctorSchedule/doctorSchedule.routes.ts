import express from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/my-schedule",
  auth(UserRole.DOCTOR),
  DoctorScheduleController.getMySchedule
);
router.post("/", auth(UserRole.DOCTOR), DoctorScheduleController.insertIntoDB);

export const DoctorScheduleRoutes = router;
