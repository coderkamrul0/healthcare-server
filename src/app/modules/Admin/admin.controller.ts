import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllAdminFromDB = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminService.getAllAdminFromDB(filter, options);
    res.status(200).json({
      success: true,
      message: "Admin data fetched.",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Something went wrong.",
      error: error,
    });
  }
};

export const AdminController = {
  getAllAdminFromDB,
};
