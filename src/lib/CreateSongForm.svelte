<script lang="ts">
  import type { EventHandler } from "svelte/elements";
  import CreateSongExtraFiles from "./CreateSongExtraFiles.svelte";
  import SafeFileInput from "./SafeFileInput.svelte";
  import type { FileUpload } from "./upload";

  let {
    title = $bindable(""),
    meta = $bindable(""),
    audioFileList = $bindable(),
    coverFileList = $bindable(),
    extraFileUploads = $bindable([]),
    showPreview = $bindable(false),
    onsubmit,
  }: {
    title?: string;
    meta?: string;
    audioFileList?: FileList;
    coverFileList?: FileList;
    extraFileUploads?: FileUpload[];
    showPreview?: boolean;
    onsubmit: EventHandler<SubmitEvent, HTMLFormElement>;
  } = $props();
</script>

<form class="flex flex-col flex-1 space-y-6" {onsubmit}>
  <!-- Vertical layout: all fields stack top-down -->
  <div>
    <label class="block text-sm font-medium mb-1" for="title">Title</label>
    <input
      class="w-full border border-gray-300 rounded px-3 py-2"
      bind:value={title}
      name="title"
      type="text"
      required
    />
  </div>

  <div>
    <label class="block text-sm font-medium mb-1" for="meta"
      >Description (optional)</label
    >
    <textarea
      class="w-full border border-gray-300 rounded px-3 py-2"
      name="meta"
      bind:value={meta}
      rows="3"
    ></textarea>
  </div>

  <div>
    <label class="block text-sm font-medium mb-1" for="audio">Audio</label>
    <SafeFileInput
      class="w-full border border-gray-300 rounded px-3 py-2"
      accept="audio/*"
      name="audio"
      bind:files={audioFileList}
      required
    />
  </div>

  <div>
    <label class="block text-sm font-medium mb-1" for="coverImage">
      Cover Image (optional)
    </label>
    <SafeFileInput
      class="w-full border border-gray-300 rounded px-3 py-2"
      accept="image/*"
      name="coverImage"
      bind:files={coverFileList}
    />
  </div>

  <div class="flex flex-col grow">
    <CreateSongExtraFiles bind:fileUploads={extraFileUploads} />
  </div>

  <!-- Buttons pushed to bottom -->
  <div class="mt-auto pt-2 flex gap-4">
    <button
      type="submit"
      class="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
    >
      Submit
    </button>

    <button
      type="button"
      class="block lg:hidden flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      onclick={() => (showPreview = true)}
    >
      Preview
    </button>
  </div>
</form>
