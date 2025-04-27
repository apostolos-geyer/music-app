import { type RequestHandler, json } from "@sveltejs/kit";

import { generatePresignedURLs } from "$lib/server/upload";

export const POST: RequestHandler = async (event) => {
  const request = event.request;
  const body = await request.json();
  console.log("Received request to generate presigned URLs", body);
  const urls = generatePresignedURLs(body);
  console.log("Generated presigned URLs", urls);
  return json(urls);
};
