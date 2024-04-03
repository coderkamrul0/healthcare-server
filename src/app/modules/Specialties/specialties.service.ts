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

const deleteSpecialties = async (specialtyId: string) => {
  await prisma.specialities.findUniqueOrThrow({
    where: {
      id: specialtyId,
    },
  });

  const result = await prisma.specialities.delete({
    where: {
      id: specialtyId,
    },
  });
  return result;
};

export const SpecialtiesServices = {
  insertSpecialties,
  getAllSpecialties,
  deleteSpecialties,
};
