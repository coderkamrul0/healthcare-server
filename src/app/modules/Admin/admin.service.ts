import { Admin, Prisma, PrismaClient } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../shared/prisma";

const getAllAdminFromDB = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = [];
  const { limit, page, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);
  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: "asc" },
  });
  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getAdminByIdFromDB = async (id: string) => {
  const result = await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};

const updateAdminById = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeleted = await transactionClient.admin.delete({
      where: {
        id,
      },
    });
    const userDeleted = await transactionClient.user.delete({
      where: {
        email: adminDeleted.email,
      },
    });
    return adminDeleted;
  });
  return result;
};

export const AdminService = {
  getAllAdminFromDB,
  getAdminByIdFromDB,
  updateAdminById,
  deleteAdminFromDB,
};
