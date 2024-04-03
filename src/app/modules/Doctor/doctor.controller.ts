import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { doctorFilterableFields } from "./doctor.constant";
import { DoctorServices } from "./doctor.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getAllDoctorFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, doctorFilterableFields);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await DoctorServices.getAllDoctorFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctors retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const DoctorController = {
  getAllDoctorFromDB,
};
