<!-- src/lib/components/NavBar.svelte -->
<script lang="ts">
  import { resolve, asset } from "$app/paths";
  import { page } from "$app/state";

  type Link = { href: `/${string}`; label: string };

  const {
    links = [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  } = $props<{ links?: Link[] }>();

  let open = $state(false);

  const pathname = $derived(page.url.pathname);

  const isActive = (href: `/${string}`) => {
    const target = resolve(href, {});
    return pathname === target || pathname.startsWith(target + "/");
  };

  $effect(() => {
    void pathname;
    open = false;
  });
</script>

<svelte:window
  onkeydown={(e) => {
    if (open && e.key === "Escape") open = false;
  }}
/>

<header class="sticky top-4 z-50 mb-4">
  <div class="mx-auto max-w-6xl px-4">
    <div
      class="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset] backdrop-blur-md md:px-4"
    >
      <a
        href={resolve("/", {})}
        class="flex shrink-0 items-center rounded-xl border border-white/15 bg-white/10 px-3 py-1.5"
      >
        <img
          src={asset("/brand/logo.png")}
          alt="pecuk.dev — Home"
          class="h-8 w-auto"
        />
      </a>

      <nav
        class="ml-1 hidden items-center gap-1 md:flex"
        aria-label="Primary navigation (desktop)"
      >
        <ul class="flex items-center gap-1">
          {#each links as l, i (l.href + "-" + i)}
            <li>
              <a
                href={resolve(l.href, {})}
                class="rounded-xl border px-3 py-1.5 transition {isActive(
                  l.href,
                )
                  ? 'border-white/25 bg-white/15'
                  : 'border-transparent hover:bg-white/10'}"
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <button
          type="button"
          class="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 transition hover:bg-white/10 md:hidden"
          onclick={() => (open = !open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="primary-navigation-mobile"
          aria-expanded={open}
        >
          ☰
        </button>
      </div>
    </div>

    <nav
      id="primary-navigation-mobile"
      class="mt-2 rounded-2xl border border-white/15 bg-white/5 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset] backdrop-blur-md md:hidden"
      aria-label="Primary navigation (mobile)"
      hidden={!open}
      inert={!open}
      aria-hidden={!open}
    >
      <ul>
        {#each links as l, i (l.href + "-" + i)}
          <li>
            <a
              href={resolve(l.href, {})}
              class="block rounded-xl px-3 py-2 transition {isActive(l.href)
                ? 'bg-white/15'
                : 'hover:bg-white/10'}"
              onclick={() => (open = false)}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</header>
