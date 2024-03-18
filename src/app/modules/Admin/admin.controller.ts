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

const getAdminByIdFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminService.getAdminByIdFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin data fetched by ID.",
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

const updateAdminById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminService.updateAdminById(id, req.body);
    res.status(200).json({
      success: true,
      message: "Admin data updated successfully.",
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

const deleteAdminFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminService.deleteAdminFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully.",
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
  getAdminByIdFromDB,
  updateAdminById,
  deleteAdminFromDB,
};
