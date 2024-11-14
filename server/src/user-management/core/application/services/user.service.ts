import { User } from "../../domain/entities/user.entity";
import { IUserReposiory } from "../../domain/ports/user.interface";
import { hashPassword, isValidEmail } from "../../../user.helpers";

export function buildUserService(userRepository: IUserReposiory) {
  async function register(userData: User) {
    // Validate the incomming data, please.
    // Validate if the user already exist


    /// Validate for spaces too.
    // I mean, just remove the spaces in between.
    const validateTypeIntegrity = Object.entries(userData).every(
      ([_, value]) => typeof value === "string" && value !== 'json'
    );

    if (
      validateTypeIntegrity === false &&
      isValidEmail(userData.email) === false 
    ) {
      throw new Error(
        `Bad request: invalid data format in users registration data`
      );
    }

    const salt = 10;
    const hashedPassword = await hashPassword(userData.password, salt);
    const user = {
      name: userData.name,
      lastname: userData.lastname,
      email: userData.email,
      password: hashedPassword,
    };

    const createNewUser = await userRepository.createNewUser(user);
    return createNewUser;
  }

  return {
    register,
  };
}
