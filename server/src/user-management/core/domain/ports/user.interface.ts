
import { QueryResult } from "pg";
import { User } from "../entities/user.entity";

export interface IUserReposiory {
  createNewUser: (user: User) => Promise<QueryResult<User>>; 
}
