import { Request, Response } from "express";

export function manageUserController() {
  return {
    httpGetUsers: {
      method: "GET",
      route: "/users",
      handler: (req: Request, res: Response) => {
        res.send("Created response succesfully");
      },
    },
  };
}
