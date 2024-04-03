import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SpecialtiesServices } from "./specialties.service";
import { Request, Response } from "express";

const insertSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtiesServices.insertSpecialties(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties Added Successfully.",
    data: result,
  });
});

const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtiesServices.getAllSpecialties();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Specialties retractive Successfully.",
    data: result,
  });
});

const deleteSpecialties = catchAsync(async (req: Request, res: Response) => {
  const { specialtyId } = req.params;
  const result = await SpecialtiesServices.deleteSpecialties(specialtyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties Deleted successfully.",
    data: result,
  });
});

export const SpecialtiesController = {
  insertSpecialties,
  getAllSpecialties,
  deleteSpecialties,
};
