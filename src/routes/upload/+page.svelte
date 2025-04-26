<script lang="ts">
  import { onMount } from "svelte";

  import { type BaseUpload } from "$lib";
  import { generateGradient } from "$lib/gradient";
  import CreateSongForm from "$lib/CreateSongForm.svelte";
  import CreateSongPreview from "$lib/CreateSongPreview.svelte";

  const didProvideFiles = (maybeFiles: FileList | undefined) =>
    maybeFiles !== undefined && maybeFiles.length >= 1;

  const firstFile = (fl: FileList) => fl.item(0)!;

  let title: string = $state("");
  let meta: string = $state("");
  let audioFileList: FileList | undefined = $state();
  let coverFileList: FileList | undefined = $state();
  let generatedCoverUrl: string = $state("");
  let extraFileUploads: BaseUpload[] = $state([]);
  let showPreview = $state(false);

  // we need to wrap this in an onMount because document isn't available
  // if it runs on server
  onMount(() => (generatedCoverUrl = generateGradient()));

  const didProvideAudioFile = $derived(didProvideFiles(audioFileList));
  const audioFile = $derived(
    didProvideAudioFile ? firstFile(audioFileList as FileList) : undefined,
  );
  const audioObjectUrl = $derived(
    didProvideAudioFile ? URL.createObjectURL(audioFile as File) : undefined,
  );

  // cover file
  const didProvideCoverFile = $derived(didProvideFiles(coverFileList));
  const coverFile = $derived(
    didProvideCoverFile ? firstFile(coverFileList as FileList) : undefined,
  );

  const coverObjectUrl = $derived(
    didProvideCoverFile
      ? URL.createObjectURL(coverFile as File)
      : generatedCoverUrl,
  );

  const extraFiles = $derived(
    extraFileUploads.map(({ title, file, meta }) => ({
      title,
      meta,
      file: didProvideFiles(file) ? firstFile(file as FileList) : undefined,
    })),
  );
</script>

{#snippet preview()}
  <CreateSongPreview
    {...{ title, meta, extraFiles, coverObjectUrl, audioObjectUrl }}
  />
{/snippet}

<div class="flex flex-col lg:flex-row gap-4 p-4 grow">
  <!-- Form -->
  <div class="flex-1 flex flex-col bg-white rounded-xl shadow border p-6">
    <CreateSongForm
      bind:title
      bind:meta
      bind:audioFileList
      bind:coverFileList
      bind:extraFileUploads
      bind:showPreview
    />
  </div>

  <!-- Desktop Preview -->
  <div class="hidden lg:block flex-1">
    {@render preview()}
  </div>
</div>

<!-- Mobile Modal Preview -->
{#if showPreview}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div
      class="bg-transparent p-6 rounded-xl shadow-xl w-full max-w-2xl mx-4 relative"
    >
      <button
        type="button"
        class="absolute top-8 right-8 text-gray-500 hover:text-gray-700 border rounded-xl px-1"
        onclick={() => (showPreview = false)}
      >
        ✕
      </button>
      {@render preview()}
    </div>
  </div>
{/if}
