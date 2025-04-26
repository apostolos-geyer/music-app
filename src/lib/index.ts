// place files you want to import through the `$lib` alias in this folder.
//

export type BaseUpload = {
  title: string;
  meta: string;
  file?: FileList | undefined;
};
