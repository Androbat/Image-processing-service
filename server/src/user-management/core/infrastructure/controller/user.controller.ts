import { Request, Response } from "express";
import { buildUserService } from "../../application/services/user.service";

export async function buildUserController(userService: ReturnType<typeof buildUserService>) {
  async function createNewUser(req: Request, res: Response) {
    const { name, lastname, email, password } = req.body;
    const userWholeData = { name, lastname, email, password };

    try {
      const userCreated = await (await userService).generateUser(userWholeData);
      res.status(200).json({
        message: "User created successfully",
        user: userCreated, 
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Error creating user",
        error: err.message,
      });
    }
  }

  return createNewUser;
}
