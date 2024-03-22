import { prisma } from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { jwtHelpers } from "./../../../helpers/jwtHelpers";
import { UserStatus } from "@prisma/client";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import emailSender from "./emailSender";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
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
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
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
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (error) {
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findFirst({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new Error("User not found!");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (
  user: any,
  payload: { oldPassword: string; newPassword: string }
) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Old Password is Wrong!");
  }
  const newHashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
      status: UserStatus.ACTIVE,
    },
    data: {
      password: newHashedPassword,
      needPasswordChange: false,
    },
  });
  return {
    message: "Password Change successfully.",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const resetPasswordToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.reset_password_secret as Secret,
    config.jwt.reset_password_secret_expires_in as string
  );
  const resetPasswordLink =
    config.reset_password_link +
    `?id=${userData.id}&token=${resetPasswordToken}`;
  await emailSender(
    userData.email,
    `<p>You are receiving this email because a password reset request has been initiated for your account.</p>
  <p>Please click on the following link, or paste this into your browser to complete the process:</p>
  <p><a href="${resetPasswordLink}">Reset Password</a></p>
  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
  );
};

export const AuthService = {
  loginUser,
  generateRefreshToken,
  changePassword,
  forgotPassword,
};
