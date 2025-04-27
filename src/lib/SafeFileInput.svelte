<script lang="ts">
  import { newFileList, fileTypeIs } from "$lib/upload";

  let {
    accept,
    files = $bindable(),
    onInvalidFiles,
    ...props
  }: any & {
    accept: string;
    files?: FileList;
    onInvalidFiles?: (files: FileList) => any;
  } = $props();

  const setFiles = (newFiles: FileList) => {
    const anyInvalid = [...newFiles].some((file) => !fileTypeIs(file, accept));
    if (anyInvalid) {
      files = newFileList();
      if (onInvalidFiles !== undefined) onInvalidFiles(newFiles);
    } else {
      files = newFiles;
    }
  };

  const getFiles = () => files;
</script>

<input type="file" {...{ accept, ...props }} bind:files={getFiles, setFiles} />
