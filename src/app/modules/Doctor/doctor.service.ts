import { Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IDoctorFilterRequest } from "./doctor.interface";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { doctorSearchableFields } from "./doctor.constant";
import { prisma } from "../../../shared/prisma";

const getAllDoctorFromDB = async (
  filters: IDoctorFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, specialties, ...filterData } = filters;

  const andConditions: Prisma.DoctorWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: doctorSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // doctor > doctorSpecialties > specialties -> title

  if (specialties && specialties.length > 0) {
    andConditions.push({
      doctorSpecialities: {
        some: {
          specialities: {
            title: {
              contains: specialties,
              mode: "insensitive",
            },
          },
        },
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
    andConditions.push(...filterConditions);
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.DoctorWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctor.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    include: {
      doctorSpecialities: {
        include: {
          specialities: true,
        },
      },
    },
  });

  const total = await prisma.doctor.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const DoctorServices = {
  getAllDoctorFromDB,
};
