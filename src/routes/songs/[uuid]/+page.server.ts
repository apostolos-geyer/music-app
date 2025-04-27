import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

import { db } from "$lib/server/db";
import { songs } from "$lib/server/db/schema";
import { S3Reader as s3 } from "$lib/server/S3";

export const load: PageServerLoad = async ({ params }) => {
  const uuid = params.uuid;
  const result = await db
    .select({
      title: songs.title,
      meta: songs.meta,
      extraFiles: songs.extraFiles,
    })
    .from(songs)
    .where(eq(songs.uuid, uuid))
    .get();

  if (result === undefined) {
    error(404, { message: `no entry for uuid ${uuid}` });
  }

  const { title, meta } = result;
  const extraFiles = result.extraFiles as { title: string; meta: string }[];

  const audio = s3
    .file(`music-test/${uuid}/audio`)
    .presign({ expiresIn: 3600 });

  const cover = s3
    .file(`music-test/${uuid}/cover`)
    .presign({ expiresIn: 3600 });

  const extras = extraFiles.map((v, i) => ({
    ...v,
    url: s3.file(`music-test/${uuid}/extra-${i}`).presign({ expiresIn: 3600 }),
  }));

  return {
    title,
    meta: meta ?? undefined,
    audio,
    cover,
    extraFiles: extras,
  };
};
