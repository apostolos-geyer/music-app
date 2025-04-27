<script lang="ts">
  import Centred from "$lib/Centred.svelte";
</script>

<Centred>
  <h1 class="text-bold text-2xl text-center">music app</h1>
  <p>nothing here</p>
  <button
    onclick={async () => {
      await fetch("/api/upload", { method: "GET" });
    }}
  >
    click me
  </button>
</Centred>
