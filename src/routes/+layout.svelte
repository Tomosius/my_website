<script lang="ts">
	import '../app.css';
	import { Navbar } from '$lib';
	import type { LayoutData } from './$types';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import { MetaTags, deepMerge, JsonLd } from 'svelte-meta-tags';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();
	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@graph': [
			// --- WebSite (site-wide, stable) ---
			{
				'@type': 'WebSite',
				'@id': 'https://pecuk.dev/#website',
				url: 'https://pecuk.dev/',
				name: 'Tomas Pecukevicius — Personal Website',
				alternateName: 'pecuk.dev',
				description:
					'Personal website of Tomas Pecukevicius: blog posts, projects, collaborations and more.',
				inLanguage: 'en-GB',
				publisher: { '@id': 'https://pecuk.dev/#person' },
				copyrightHolder: { '@id': 'https://pecuk.dev/#person' },
				// Optional: declare a site logo that other nodes can reference
				logo: { '@id': 'https://pecuk.dev/#logo' }
			},

			// --- Person (your primary entity) ---
			{
				'@type': 'Person',
				'@id': 'https://pecuk.dev/#person',
				name: 'Tomas Pecukevicius',
				url: 'https://pecuk.dev/',
				sameAs: [
					'https://www.linkedin.com/in/tomas-pecukevicius-a9837652/',
					'https://github.com/Tomosius'
				],
				// If your About page exists, link the person to it:
				mainEntityOfPage: { '@id': 'https://pecuk.dev/about#webpage' },
				image: { '@id': 'https://pecuk.dev/#logo' }
			},

			// --- ImageObject for logo / avatar (reusable by WebSite & Person) ---
			{
				'@type': 'ImageObject',
				'@id': 'https://pecuk.dev/#logo',
				url: 'https://pecuk.dev/brand/logo.png'
				// width: 512,  // add actual dimensions if known
				// height: 512, // add actual dimensions if known
				// caption: 'pecuk.dev logo'
			}
		]
	}}
/>
<MetaTags {...metaTags} />

<Navbar />

{@render children()}
