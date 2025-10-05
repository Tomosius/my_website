export const prerender = true;

import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = ({ url }) => {
	const baseMetaTags = Object.freeze({
		title: 'pecuk.dev',
		description: 'Personal website of Tomas Pecukevicius - software developer',
		canonical: new URL(url.pathname, url.origin).href,
		author: 'Tomas Pecukevicius',
		keywords: ['Tomas Pecukevicius', 'machine learning', 'software developer'],

		additionalLinkTags: [
			{
				rel: 'LinkedIn',
				href: 'https://www.linkedin.com/in/tomas-pecukevicius-a9837652/'
			},
			{
				rel: 'apple-touch-GitHub',
				href: 'https://github.com/Tomosius'
			}
		],

		openGraph: {
			type: 'website',
			url: new URL(url.pathname, url.origin).href,
			locale: 'en_GB',
			title: 'pecuk.dev',
			description: 'Personal website of Tomas Pecukevicius - software developer',
			siteName: 'pecuk.dev'
		}
	}) satisfies MetaTagsProps;

	return {
		baseMetaTags
	};
};
