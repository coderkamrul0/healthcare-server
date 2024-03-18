import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
const prisma = new PrismaClient();

const getAllAdminFromDB = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = [];
  const { limit, page } = options;
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
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
  });
  return result;
};

export const AdminService = {
  getAllAdminFromDB,
};
