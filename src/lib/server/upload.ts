import type {
  RequestPresignedURLs,
  ResponsePresignedURLs,
  RequestSubmitSong,
} from "$lib/upload";
import { S3Writer as s3 } from "$lib/server/S3";
import { db, transaction } from "$lib/server/DB";

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
  const query = {
    sql: `INSERT INTO songs (uuid, title, meta, extra_files)
          VALUES (:uuid, :title, :meta, :extra_files)`,
    args: {
      uuid: uuid,
      title: title,
      meta: meta ?? null,
      extra_files: JSON.stringify(extraFiles), // JSON needs to be stringified
    },
  };
  const [_, err]: [void, Error | undefined] = await transaction(
    "write",
    async (db) => {
      await db.execute(query);
    },
  );
  if (err) {
    console.error("an error occurred submitting the song", err);
    return err;
  }
};
