import express, { NextFunction, Request, Response } from "express";
import { SpecialtiesController } from "./specialties.controller";
import { FileUploader } from "../../../helpers/fileUploader";
import { SpecialtiesValidation } from "./specailties.validation";

const router = express.Router();

router.post(
  "/",
  FileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidation.createSpecialties.parse(
      JSON.parse(req.body.data)
    );
    return SpecialtiesController.insertSpecialties(req, res, next);
  }
);

export const SpecialtiesRoutes = router;
