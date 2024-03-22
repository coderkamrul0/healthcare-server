import { NextFunction, Request, Response } from "express";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("Authentication failed: No token provided.");
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      console.log(verifiedUser);

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new Error(
          "Authorization failed: You do not have permission to access this resource."
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
