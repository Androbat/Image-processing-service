import pg from "pg";

const { Client } = pg;

// After testing move the connection properties to .env
// Once the .env variables are added, validate they're not undefined.
export const client = new Client({
  user: "postgres",
  password: "123456789",
  host: "localhost",
  port: 5432,
  database: "postgre_db",
});

export async function query(querystr: string, queryParameters: any[]) {
  return await client.query(querystr, queryParameters);
}
