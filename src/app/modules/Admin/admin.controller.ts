import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";

const getAllAdminFromDB = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, [
      "name",
      "email",
      "searchTerm",
      "contactNumber",
    ]);
    const result = await AdminService.getAllAdminFromDB(filter);
    res.status(200).json({
      success: true,
      message: "Admin data fetched.",
      data: result,
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
