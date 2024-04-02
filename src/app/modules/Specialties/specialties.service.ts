import { Request } from "express";
import { FileUploader } from "../../../helpers/fileUploader";
import { prisma } from "../../../shared/prisma";

const insertSpecialties = async (req: Request) => {
  const file = req.file;

  if (file) {
    const uploadToCloudinary = await FileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary.secure_url;
  }

  const result = await prisma.specialities.create({
    data: req.body,
  });
  return result;
};

export const SpecialtiesServices = {
  insertSpecialties,
};
