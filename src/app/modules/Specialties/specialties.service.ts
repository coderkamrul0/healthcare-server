import { Request } from "express";
import { FileUploader } from "../../../helpers/fileUploader";
import { prisma } from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";

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

const getAllSpecialties = async () => {
  const result = await prisma.specialities.findMany();
  return result;
};
const updateSpecialties = async (req: Request, specialtyId: string) => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await FileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary.secure_url;
  }
  const result = await prisma.specialities.update({
    where: {
      id: specialtyId,
    },
    data: req.body,
  });
  return result;
};

export const SpecialtiesServices = {
  insertSpecialties,
  getAllSpecialties,
  updateSpecialties,
};
