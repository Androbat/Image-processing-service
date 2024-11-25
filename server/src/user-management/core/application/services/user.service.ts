import { User } from "../../domain/entities/user.entity";
import { IUserReposiory } from "../../domain/ports/user.interface";
import { QueryResult } from "pg";


export async function buildUserService(buildUserRepository: IUserReposiory) {
  async function generateUser(userInput: User) {
    const user = {
      name: userInput.name,
      lastname: userInput.lastname,
      email: userInput.email,
      password: userInput.password, // Correctly assigning the password
    };

    const userCreated = await buildUserRepository.createNewUser(user);
    if (userCreated) {
      console.log("User has been created successfully");
      return userCreated;
    }
    throw new Error('User creation failed');
  }

  return {
    generateUser,
  };
}
