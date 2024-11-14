import { User } from "../../domain/entities/user.entity";
import { IUserReposiory } from "../../domain/ports/user.interface";
import { query } from "../../../../db";

// I should think of the return type for this functions
export async function buildUserRepository() {
  // Add returning type
  async function createNewUser(user: User) {
    // Validate if the user table already exist.
    // if it does not exist, then create it.
    const queryStr = `INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4)`;
    const userQueryParameters = [
      user.name,
      user.lastname,
      user.email,
      user.password,
    ];
    const insertUser = await query(queryStr, userQueryParameters);
    return insertUser;
  }

  return {
    createNewUser,
  };
}
