/**
 * Basic structure of our file uploads in the browser
 */
export type FileUpload = {
  title: string;
  meta: string;
  file?: FileList | undefined;
};

/**
 * Request structure when requesting presigned URLs
 */
export type RequestPresignedURLs = {
  prefix: string;
  audioFileType: string;
  coverFileType: string;
  extraFileTypes?: string[];
};

/**
 * Response structure when requesting presigned URLs
 */
export type ResponsePresignedURLs = {
  audio: string;
  cover: string;
  extraFiles: string[];
};

/**
 * Structure for uploading the files to the backend file storage
 */
type RequestUploadFiles = {
  files: {
    audio: File;
    cover: Blob;
    extraFiles: File[];
  };
  urls: ResponsePresignedURLs;
};

export type Song = {
  id: number;
  uuid: string;
  title: string;
  meta?: string;
  extraFiles?: Record<string, string>;
  createdAt: string;
};

export type RequestSubmitSong = {
  uuid: string;
  title: string;
  meta?: string;
  extraFiles: { title: string; meta?: string }[];
};

/**
 * Gets the presigned upload URLs from the backend
 */
export const generatePresignedURLs = async (
  req: RequestPresignedURLs,
): Promise<ResponsePresignedURLs> => {
  console.log("Requesting presigned URLs for uploads.", req);
  const response = await fetch("api/upload/presign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  const body = await response.json();
  console.log("Received URLs.", body);
  return body as ResponsePresignedURLs; // trust me bro
};

/**
 * Uploads the files to the presigned upload URLs provided
 */
export const uploadFiles = async ({ files, urls }: RequestUploadFiles) =>
  await Promise.all(
    [
      { url: urls.audio, file: files.audio },
      { url: urls.cover, file: files.cover },
      ...urls.extraFiles.map((url, i) => ({ url, file: files.extraFiles[i] })),
    ].map(({ url, file }) =>
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      }),
    ),
  );

/*client side method for submitting song to db*/
export const submitSongToDB = async (
  data: RequestSubmitSong,
): Promise<boolean> => {
  const response = await fetch("/api/upload", {
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log(response);
  console.log(await response.json());
  const status = response.status;
  return status === 201;
};

/**
 * Workaround to construct a new FileList since there's no JavaScript API to
 * instantiate them directly
 */
export const newFileList = (): FileList => new DataTransfer().files;

/**
 * Helper to check that a file is the right MIME type
 */
export const fileTypeIs = (file: File, fileType: string): boolean => {
  if (!file || !file.type) return false;
  else
    return fileType.endsWith("/*")
      ? file.type.startsWith(`${fileType.slice(0, fileType.indexOf("*"))}`)
      : file.type === fileType;
};
