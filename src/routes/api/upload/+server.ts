import { type RequestHandler } from "@sveltejs/kit";

import { submitSongToDB } from "$lib/server/upload";

/**
 * Submits the uploaded song to the database
 */
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  console.log("Submitting track to database", data);
  const err = await submitSongToDB(data);
  if (err) {
    throw err;
  }
  return new Response(null, { status: 201 });
};
