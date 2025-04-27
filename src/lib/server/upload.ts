import type {
  RequestPresignedURLs,
  ResponsePresignedURLs,
  RequestSubmitSong,
} from "$lib/upload";
import { S3Writer as s3 } from "$lib/server/S3";
import { db } from "$lib/server/db";
import { songs } from "./db/schema";

const basePrefix = "music-test";
const expiry = 60 * 2;

/**
 * Generates presigned S3 upload URLs for song uploads and their associated files.
 */
export const generatePresignedURLs = ({
  prefix,
  audioFileType,
  coverFileType,
  extraFileTypes = [],
}: RequestPresignedURLs): ResponsePresignedURLs => {
  const uploadPrefix = `${basePrefix}/${prefix}`;
  return {
    audio: s3.presign(`${uploadPrefix}/audio`, {
      expiresIn: expiry,
      method: "PUT",
      type: audioFileType,
    }),
    cover: s3.presign(`${uploadPrefix}/cover`, {
      expiresIn: expiry,
      method: "PUT",
      type: coverFileType,
    }),
    extraFiles: extraFileTypes.map((fileType, i) =>
      s3.presign(`${uploadPrefix}/extra-${i}`, {
        expiresIn: expiry,
        method: "PUT",
        type: fileType,
      }),
    ),
  };
};

/**
 * Submit song to the database
 */
export const submitSongToDB = async ({
  uuid,
  title,
  meta,
  extraFiles,
}: RequestSubmitSong) => {
  try {
    return await db.transaction(
      async (tx) =>
        await tx
          .insert(songs)
          .values({ uuid, title, meta, extraFiles })
          .returning(),
    );
  } catch (error) {
    console.error(`error ocurred on submission of song`, error);
    throw error;
  }
};
