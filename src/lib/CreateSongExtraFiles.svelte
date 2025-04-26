<script lang="ts">
  import { type BaseUpload } from "$lib";

  interface Props {
    fileUploads?: BaseUpload[];
  }

  let { fileUploads = $bindable([]) }: Props = $props();

  const touch = () =>
    fileUploads.push({ title: "", file: undefined, meta: "" });

  const rm = (index: number) => fileUploads.splice(index, 1);
</script>

<div class="flex justify-between items-center mb-2">
  <h2 class="text-sm font-semibold">Extra Files</h2>
  <button
    type="button"
    class="text-sm px-2 py-1 rounded bg-green-100 hover:bg-green-200"
    onclick={touch}
  >
    + Add File
  </button>
</div>

<div class="border border-gray-300 rounded flex-1">
  {#each fileUploads as upload, i}
    <div class="border border-gray-300 rounded p-3 mb-3 space-y-2">
      <input
        class="w-full border border-gray-300 rounded px-3 py-2"
        type="text"
        placeholder="Extra file title"
        bind:value={upload.title}
        required
      />
      <textarea
        class="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Meta (optional)"
        bind:value={upload.meta}
        rows="2"
      ></textarea>
      <input
        class="w-full border border-gray-300 rounded px-3 py-2"
        type="file"
        bind:files={upload.file}
        required
      />
      <button
        type="button"
        class="text-sm text-red-600 hover:underline mt-1"
        onclick={() => rm(i)}
      >
        Remove
      </button>
    </div>
  {/each}
</div>
