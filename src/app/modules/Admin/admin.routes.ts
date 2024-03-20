import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
import z, { AnyZodObject } from "zod";

const router = express.Router();

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (err) {
      next(err);
    }
  };
};

router.get("/", AdminController.getAllAdminFromDB);
router.get("/:id", AdminController.getAdminByIdFromDB);
router.patch("/:id", validateRequest(update), AdminController.updateAdminById);
router.delete("/:id", AdminController.deleteAdminFromDB);
router.delete("/soft/:id", AdminController.softDeleteAdminFromDB);

export const AdminRoutes = router;
