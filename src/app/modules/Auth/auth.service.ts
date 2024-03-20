import { prisma } from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { jwtHelpers } from "./../../../helpers/jwtHelpers";
import jwt from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Incorrect password");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefg",
    "5m"
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefghij",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const generateRefreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwt.verify(token, "abcdefghij");
    console.log(decodedData);
  } catch (error) {
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findFirst({
    where: {
      email: decodedData?.email,
    },
  });

  if(!userData){
    throw new Error("User not found!")
  }

  
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefg",
    "5m"
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthService = {
  loginUser,
  generateRefreshToken,
};
