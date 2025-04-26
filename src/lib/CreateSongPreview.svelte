<script lang="ts">
  interface Props {
    title: string;
    meta: string;
    coverObjectUrl: string;
    audioObjectUrl?: string;
    extraFiles: { title: string; file?: File; meta?: string }[];
  }

  const { title, meta, coverObjectUrl, audioObjectUrl, extraFiles }: Props =
    $props();
</script>

<div
  class="p-6 bg-white rounded-xl shadow border max-w-2xl mx-auto space-y-6 w-full"
>
  <h2 class="text-2xl font-bold text-center text-gray-900">
    {#if title}
      {title}
    {:else}
      <em class="text-gray-400">your next masterpiece?</em>
    {/if}
  </h2>

  <div class="w-full aspect-square overflow-hidden rounded-lg">
    <img src={coverObjectUrl} alt="Cover" class="object-cover w-full h-full" />
  </div>

  {#if audioObjectUrl !== undefined}
    <audio controls src={audioObjectUrl} class="w-full mt-4 rounded"></audio>
  {/if}

  {#if meta}
    <p class="text-gray-700 italic mt-4 whitespace-pre-wrap">{meta}</p>
  {/if}

  {#if extraFiles.length > 0}
    <section class="space-y-2 mt-6">
      <h3 class="text-lg font-semibold text-gray-800">Additional Content</h3>
      <div class="flex flex-col gap-2">
        {#each extraFiles as { title, file, meta: extraMeta }}
          <details class="border rounded-md p-3 bg-gray-50">
            <summary
              class="cursor-pointer font-medium text-gray-700 flex justify-between items-center"
            >
              <span>{title || "Untitled Extra File"}</span>
              <span class="text-sm text-gray-400">
                {#if file}
                  {file.name}
                {:else}
                  No file
                {/if}
              </span>
            </summary>
            <div class="mt-2 text-gray-600 space-y-1">
              {#if extraMeta}
                <p class="text-sm whitespace-pre-wrap">{extraMeta}</p>
              {/if}
            </div>
          </details>
        {/each}
      </div>
    </section>
  {/if}
</div>
