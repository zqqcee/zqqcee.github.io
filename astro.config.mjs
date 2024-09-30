import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

export default defineConfig({
	integrations: [tailwind(), react()],
	markdown: {
		shikiConfig: {
			// Choose from Shiki's built-in themes (or add your own)
			// https://shiki.style/themes
			theme: 'dracula',
			// Alternatively, provide multiple themes
			// See note below for using dual light/dark themes
			// themes: {
			// 	light: 'github-light',
			// 	dark: 'github-dark',
			// },
			// Disable the default colors
			// https://shiki.style/guide/dual-themes#without-default-color
			// (Added in v4.12.0)
			// defaultColor: false,
			// Add custom languages
			// Note: Shiki has countless langs built-in, including .astro!
			// https://shiki.style/languages
			langs: ['javascript'],
			// Enable word wrap to prevent horizontal scrolling
			wrap: true,
			// Add custom transformers: https://shiki.style/guide/transformers
			// Find common transformers: https://shiki.style/packages/transformers
			transformers: [],
		},
	},
});
