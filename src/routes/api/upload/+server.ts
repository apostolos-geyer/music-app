import { json, type RequestHandler } from "@sveltejs/kit";

import { submitSongToDB } from "$lib/server/upload";
import { db } from "$lib/server/DB";

const ok = "ok";

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  console.log("Submitting track to database", data);
  const err = await submitSongToDB(data);
  if (err) {
    throw err;
  }
  return new Response(null, { status: 201 });
};

export const GET: RequestHandler = async () => {
  const result = await db.execute("SELECT * FROM songs");
  console.log(result);
  for (const row of result.rows) {
    console.log(row);
  }

  return json({ ok });
};
