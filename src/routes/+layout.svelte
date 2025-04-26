<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";

  let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
  <header class="p-4 bg-stone-900 text-amber-50 min-w-screen">
    <div class="flex flex-row items-center justify-between">
      <nav class="flex flex-row items-center">
        <a
          href="/"
          title="Home"
          class={[
            "font-light hover:italic hover:underline",
            { "text-xl": page.url.pathname === "/" },
          ]}
        >
          home
        </a>
        <div class="w-px h-6 bg-amber-50 mx-2" aria-hidden="true"></div>
        <a
          href="/upload"
          title="Upload"
          class={[
            "font-light hover:italic hover:underline",
            { "text-xl": page.url.pathname === "/upload" },
          ]}
        >
          upload
        </a>
      </nav>
      <h1 class="text-3xl font-light hover:italic hover:underline">
        <a href="/" title="Home">Boobies</a>
      </h1>
    </div>
  </header>
  <main class="flex-1 flex flex-col">
    {@render children()}
  </main>
  <footer>the bottom</footer>
</div>
