import { Request, Response } from "express";
// import { StatusCodes } from "../statusCodes";
import { buildUserRepository } from "../repository/user.repository";
import { hashPassword, isValidMinPasswordChars } from "../helpers";

import { StatusCodes } from "../statusCodes";

// Pass the repository the the manageUserController and do the operations there.
export function manageUserController() {
  return {
    httpRegisterUser: {
      method: "POST",
      route: "/register",
      handler: async (req: Request, res: Response) => {
        // My user should have the following information: USERNAME & PASSWORD
        // The user password should be hashed before being inserted in the database
        const userRepostiory = await buildUserRepository();

        if (!req.body) {
          res.status(StatusCodes.BAD_REQUEST).json({
            message: `Invalid request: request must contain data`,
          });
          return;
        } else {
          Object.values(req.body).some((value) => {
            if (typeof value === "undefined"){
              res.status(StatusCodes.BAD_REQUEST).json({
                message: `None of the properties can be undefined`
              });
            }
          })
        }

        

        const { username, password } = req.body;
        const salt = 10;
        
        const isValidDataTypeInUserFieldValues = [username, password].every((value) => typeof value === "string");
        if (!isValidDataTypeInUserFieldValues){
          res.status(StatusCodes.BAD_REQUEST).json({
            message: `Wrong data type in user fields: both username and password must be string type`
          });
          return;
        }

        const containsValidPasswordMinChars = isValidMinPasswordChars(password);
        if (!containsValidPasswordMinChars) {
          res.status(StatusCodes.BAD_REQUEST).json({
            message: `Password at least must contain 8 characters`,
          });
          return;
        }

        const passwordHashed = await hashPassword(password, salt);
        const insertUser = userRepostiory.createUser(username, passwordHashed);
        res.status(StatusCodes.OK).json({
          message: `User inserted sucessfully`,
          username: insertUser
        });
        
      },
    },
  };
}


