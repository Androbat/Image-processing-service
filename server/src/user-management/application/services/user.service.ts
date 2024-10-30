import { User } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.interface";

export function buildUserService(userRepository: UserRepository) {
  async function create(
    name: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<User> {
    
    const user = { name, lastname, email, password };

    // The following must be rechecked since probably won't need ncessary in SERVICE
    // I can avoid having the validate incoming data by using ZOD
    Object.entries(user).forEach(([key, value]) => {
      if (!value || typeof value !== 'string' || value.trim() === ''){
        throw new Error(`Invalid user data for ${key}: ${value}`);
      }
    });

    // Hash the user password.

    return await userRepository.save(user);
  }

  return {
    create,
  };
}
