import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.createSchedule(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule Created successfully",
    data: result,
  });
});

export const ScheduleController = {
  createSchedule,
};
