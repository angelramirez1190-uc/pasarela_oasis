import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default async function dbConnect() {
  await pool.connect((err: any, client: any, release: any) => {
    if (err) {
      return console.error("Error on conection", err.stak);
    }
    client.query("SELECT NOW()", (err: any, result: any) => {
      release();
      if (err) {
        return console.error("Error on query", err.stak);
      }
      console.log("Connected at db", result);
    });
  });
}
