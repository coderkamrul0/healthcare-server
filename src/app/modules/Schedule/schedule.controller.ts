import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { IAuthUser } from "../../interfaces/common";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.createSchedule(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule Created successfully",
    data: result,
  });
});

const getAllSchedule = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const user = req.user;
    const result = await ScheduleService.getAllSchedule(
      filters,
      options,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedule retrieving successfully",
      data: result,
    });
  }
);

const getScheduleByID = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleService.getScheduleByID(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule retrieving successfully",
    data: result,
  });
});

const deleteScheduleByID = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleService.deleteScheduleByID(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule Deleted successfully",
    data: result,
  });
});

export const ScheduleController = {
  createSchedule,
  getAllSchedule,
  getScheduleByID,
  deleteScheduleByID,
};
