<!-- StackedSticky.svelte (SvelteKit 5 / runes-friendly) -->
<script lang="ts">
	// no JS needed for the basic effect
</script>

<div>
	<!-- div 1 -->

	<section class="sticky top-0 z-10 grid h-screen place-items-center bg-purple-700">
		<h1 class="text-4xl font-bold">Div 1</h1>
	</section>

	<!-- div 2 (will scroll over div 1) -->
	<section class="sticky top-0 z-20 grid h-screen place-items-center bg-blue-700">
		<h1 class="text-4xl font-bold">Div 2</h1>
	</section>
</div>
