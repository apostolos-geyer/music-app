import { S3Client } from "bun";
import {
  S3_BUCKET,
  S3_ENDPOINT,
  S3_READ_ACCESS_KEY_ID,
  S3_READ_SECRET_ACCESS_KEY,
  S3_WRITE_ACCESS_KEY_ID,
  S3_WRITE_SECRET_ACCESS_KEY,
} from "$env/static/private";

const location = { bucket: S3_BUCKET, endpoint: S3_ENDPOINT };

const readCredentials = {
  accessKeyId: S3_READ_ACCESS_KEY_ID,
  secretAccessKey: S3_READ_SECRET_ACCESS_KEY,
};

const writeCredentials = {
  accessKeyId: S3_WRITE_ACCESS_KEY_ID,
  secretAccessKey: S3_WRITE_SECRET_ACCESS_KEY,
};

/*s3 client with read access*/
export const S3Reader = new S3Client({ ...location, ...readCredentials });

/*s3 client with write access*/
export const S3Writer = new S3Client({ ...location, ...writeCredentials });
