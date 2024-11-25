import express from 'express';
import { buildUserRepository } from './user-management/core/infrastructure/repository/user.repository';
import { buildUserService } from './user-management/core/application/services/user.service';
import { buildUserController } from './user-management/core/infrastructure/controller/user.controller';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function initApp() {
  const userRepository = await buildUserRepository();
  const userService = await buildUserService(userRepository);
  const userController = await buildUserController(userService);

  app.post('/register', async (req, res) => {
    await userController(req, res); // Await the result of userController
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

initApp().catch((err) => console.log(`Failed to initialize app: ${err}`));
