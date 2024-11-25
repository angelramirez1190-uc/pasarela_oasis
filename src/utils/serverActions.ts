"use server";

import { pool } from "@/utils/dbConnect";

export async function createReservation(
  status: boolean,
  value: number | string | undefined,
  id: number | string | undefined
) {
  try {
    const result = await pool.query(
      `UPDATE tasks_reserva 
         SET estado = $1, valor = $2 
         WHERE id = $3 
         RETURNING *`,
      [status, value, id]
    );
  } catch (error) {
    console.error("Error inserting reservation:", error);
  }
}
export async function selectReservation(id: string | number) {
  try {
    const result = await pool.query(
      `SELECT * FROM tasks_reserva WHERE id = $1`,
      [id]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching reservation:", error);
    throw new Error("Error fetching reservation");
  }
}
