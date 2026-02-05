import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import remarkToc from 'remark-toc';
import path from 'path';
// import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

export default defineConfig({
	integrations: [tailwind(), react()],
	vite: {
		resolve: {
			alias: {
				'@': path.resolve('./src'),
			},
		},
	},
	markdown: {
		shikiConfig: {
			theme: 'dracula',
			langs: ['javascript'],
			wrap: true,
			transformers: [],
		},
		remarkPlugins: [[remarkToc, { heading: 'toc', maxDepth: 3 }]],
	},
	server: {
		host: true,
	},
	site: 'https://luckycc.cc',
	redirects: {
		'/posts': '/posts/1',
		'/thoughts': '/thoughts/1',
	},
});
