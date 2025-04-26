<script lang="ts">
  const { children } = $props();
</script>

<div class="mx-auto max-w-3xl">
  <div class="w-full max-w-none p-4 my-2 flex-1">
    {@render children?.()}
  </div>
</div>
