import { manageUserController } from "./controllers/user.controller";
import { baseRouter } from "./router";

export function initServer(app: Express.Application) {
  const httpUserController = manageUserController();

  Object.values(httpUserController).forEach((endpoints) => {
    const { route, method, handler } = endpoints;

    switch (method) {
      case "POST": {
        // Create a mapper for the request
        console.log("called");
        baseRouter.post(route, handler);
      }
    }
  });
}
