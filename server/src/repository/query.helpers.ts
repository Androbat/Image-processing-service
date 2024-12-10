import { query } from "../db";

export async function nonDuplicateUsers(username: string) {
  const queryStr = "SELECT 1 FROM users WHERE username = $1 LIMIT 1";
  const queryResult = await query(queryStr, [username]);

  if (!queryResult || queryResult.rowCount === 0) {
    return false;
  }

  return true;
}

export async function tableExist(table: string) {
  const queryStr = `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name=$1) AS table_existence`;
  const queryResult = await query(queryStr, [table]);
  if (!queryResult){
    return true;
  }

  return false;
}

/*

"SELECT 1 FROM users WHERE email = $1 LIMIT 1"

*/
