import express from 'express';
import { buildUserRepository } from './user-management/core/infrastructure/repository/user.repository';
import { buildUserService } from './user-management/core/application/services/user.service';
import { buildUserController } from './user-management/core/infrastructure/controller/user.controller';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function initApp(){
  // Change this repository call for a function that returns all the repositories setup
  const userRepository = await buildUserRepository();
  const userService = buildUserService(userRepository);
  const userController = await buildUserController(userService);
  

  // Reinvent this in another way
  app.post('/register', (req, res) => {
    userController.registerUser(req, res);
  });
}





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


initApp().catch((err) => console.log(`Failed to initialize app: ${err}`))
