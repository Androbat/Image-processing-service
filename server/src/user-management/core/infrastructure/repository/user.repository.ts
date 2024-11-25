import { User } from "../../domain/entities/user.entity";
import { IUserReposiory } from "../../domain/ports/user.interface";
import { query } from "../../../../db";

export async function buildUserRepository(): Promise<IUserReposiory> {
  async function createNewUser(user: User) {
    const queryStr = `INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4)`;
    const userQueryParameters = [
      user.name,
      user.lastname,
      user.email,
      user.password,
    ];

    const result = await query(queryStr, userQueryParameters);
    return result.rows[0]; // Return the first row, which represents the created user
  }

  return {
    createNewUser,
  };
}
