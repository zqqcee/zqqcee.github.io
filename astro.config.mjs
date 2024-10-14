import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import remarkToc from 'remark-toc';
// import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

export default defineConfig({
	integrations: [tailwind(), react()],
	markdown: {
		shikiConfig: {
			theme: 'dracula',
			langs: ['javascript'],
			wrap: true,
			transformers: [],
		},
		remarkPlugins: [[remarkToc, { heading: 'toc', maxDepth: 3 }]],
		// rehypePlugins: [rehypeAccessibleEmojis],
	},
	server: {
		host: true,
	},
	site: 'https://zqqcee.github.io',
	redirects: {
		'/posts': '/posts/1',
		'/thoughts': '/thoughts/1',
	},
});
