import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllAdminFromDB = async (req: Request, res: Response) => {
  const result = await AdminService.getAllAdminFromDB();
  console.log(result);
  try {
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
