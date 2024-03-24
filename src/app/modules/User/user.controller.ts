import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { userFilterAbleFields } from "./user.constant";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created successfully!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createDoctor(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Created successfully!",
    data: result,
  });
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient Created successfully!",
    data: result,
  });
});

const getAllUserFromDB = catchAsync(async (req, res) => {
  const filter = pick(req.query, userFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await userService.getAllUserFromDB(filter, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Users data fetched.",
    meta: result.meta,
    data: result.data,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUserFromDB,
};
