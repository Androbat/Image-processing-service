import express, {Request, Response } from 'express';
import { manageUserController } from './controllers/user.controller';
import { baseRouter } from './router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function initApp() {
  const httpUserController = manageUserController();
  Object.values(httpUserController).forEach((endpoints) => {
    const { route, method, ...endpoint} = endpoints;
    
    switch(method){
      case "GET": {
        // Create a mapper for the request
        baseRouter.get(route, endpoint.handler);
      }
    }
  })

}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

initApp().catch((err) => console.log(`Failed to initialize app: ${err}`));
