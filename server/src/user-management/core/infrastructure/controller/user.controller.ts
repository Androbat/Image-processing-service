import { buildUserService } from "../../application/services/user.service";
import { Request, Response } from "express";

export async function buildUserController(
  userService: ReturnType<typeof buildUserService>
) {
  async function registerUser(req: Request, res: Response) {
    // Might be something to take a look at to.

    // I should call the service to handle the data that's supposed to validate,
    // since I'm receiving the data, the other module (service) validate the incoming data and
    // handles the logic, so here the only think I should do for now is check that I'm not
    // receiving undefined values by the server.

    const undefinedContext = Object.values(req.body).every(
      (context) => context === undefined
    );
    if (!req.body && undefinedContext === true) {
      return {
        status: res.status(400),
        message: res.json(`Invalid request: empty body request`),
      };
    }

    const user = {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    };

    const userValidationHandlerRes = userService.register(user);
    if (!userValidationHandlerRes) {
      return {
        status: res.status(500),
        message: res.json(
          `Internal Server error: user was not able to be inserted.`
        ),
      };
    }
    return userValidationHandlerRes;
  }

  return {
    registerUser,
  };
}
