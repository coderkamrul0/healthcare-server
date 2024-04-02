import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SpecialtiesServices } from "./specialties.service";

const insertSpecialties = catchAsync(async (req, res) => {
  const result = await SpecialtiesServices.insertSpecialties(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties Added Successfully.",
    data: result,
  });
});

export const SpecialtiesController = {
  insertSpecialties,
};
