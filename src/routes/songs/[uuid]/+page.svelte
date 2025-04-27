<script lang="ts">
  import type { PageProps } from "./$types";
  import SongView from "$lib/SongView.svelte";

  let { data }: PageProps = $props();
  console.log(data);
</script>

<SongView {...data} />
