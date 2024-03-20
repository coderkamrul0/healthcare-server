import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const getAllAdminFromDB = catchAsync(async (req, res) => {
  const filter = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AdminService.getAllAdminFromDB(filter, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data fetched.",
    meta: result.meta,
    data: result.data,
  });
});

const getAdminByIdFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminService.getAdminByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data fetched.",
    data: result,
  });
});

const updateAdminById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminService.updateAdminById(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data updated successfully.",
    data: result,
  });
});

const deleteAdminFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.deleteAdminFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully.",
    data: result,
  });
});

const softDeleteAdminFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.softDeleteAdminFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin soft deleted successfully.",
    data: result,
  });
});

export const AdminController = {
  getAllAdminFromDB,
  getAdminByIdFromDB,
  updateAdminById,
  deleteAdminFromDB,
  softDeleteAdminFromDB,
};
