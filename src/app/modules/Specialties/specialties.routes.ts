import express, { NextFunction, Request, Response } from "express";
import { FileUploader } from "../../../helpers/fileUploader";
import { SpecialtiesValidation } from "./specailties.validation";
import { SpecialtiesController } from "./specialties.controller";

const router = express.Router();

router.get("/", SpecialtiesController.getAllSpecialties);

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

router.delete("/:specialtyId", SpecialtiesController.deleteSpecialties);

export const SpecialtiesRoutes = router;
