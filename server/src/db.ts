import pg from "pg";

const { Client } = pg;

// After testing move the connection properties to .env
// Once the .env variables are added, validate they're not undefined.

type QueryPrimitiveValues = number | string;
type QueryValue = QueryPrimitiveValues[]; 


export async function connectDatabase(): Promise<pg.Client> {
  const client = new Client({
    user: "postgres",
    password: "123456789",
    host: "localhost",
    port: 5432,
    database: "img_processing",
  });

  await client.connect();
  return client; 
}

export async function query(querystr: string, queryParameters: QueryValue = []) {
  const client = await connectDatabase();
  return await client.query(querystr, queryParameters);
}