<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { page } from '$app/state';
	import { MetaTags, JsonLd, deepMerge } from 'svelte-meta-tags';

	let { data, children } = $props();

	// merge layout defaults + per-page overrides (runes: use $derived)
	const toArr = (v: unknown) => (Array.isArray(v) ? v : v ? [v] : []);

	let metaTags = $derived(deepMerge(data.baseMetaTags ?? {}, page.data.pageMetaTags ?? {}));

	let schemas = $derived([...toArr(data.baseJsonLd), ...toArr(page.data.pageJsonLd)]);
</script>

<MetaTags {...metaTags} />

{#each schemas as schema}
	<JsonLd {schema} />
{/each}

{@render children?.()}
