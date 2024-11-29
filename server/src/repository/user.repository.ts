import { query } from "../db";


export async function buildUserRepository() {
  async function createUser(username: string, password: string) {
    // Need to check if the user exist before inserting it.
    // Check if the user table does exist first too
    const defineUserQuery = `INSERT INTO Users (username, password) VALUES ($1, $2)`;
    const queryParams = [username, password];
    const insertUserQuery = await query(defineUserQuery, queryParams);
    const insertedUserData = insertUserQuery.rows[0];
    return insertedUserData;
  }

  return {
    createUser,
  };
}

// async function insertUserTest(){
//     const params = ["man", "pass"];
//     const queryStr = `INSERT INTO users (username, password) VALUES ($1, $2)`;
    
    
//     return query(queryStr, params)
    
// }

// async function getRows(){
//   const queryStr = `SELECT * FROM users`;
//   const execQuery = await query(queryStr);
//   console.table(execQuery.fields)
//   return execQuery.rows;
// }

// getRows().catch((err) => console.log(`We're unable to execute the query. Following error: ${err}`));
