/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.white'),
						a: {
							color: theme('colors.white'),
						},
						h1: {
							color: theme('colors.white'),
						},
						h2: {
							color: theme('colors.white'),
						},
						h3: {
							color: theme('colors.white'),
						},
						p: {
							color: theme('colors.white'),
						},
						strong: {
							color: theme('colors.white'),
						},
						code: {
							color: theme('colors.white'),
							borderRadius: '.25rem',
							color: '#ffffff',
							fontSize: '.875em',
							fontWeight: '550',
							padding: '.15rem .3rem',
							backgroundColor: '#3b3b3b',
						},
						'code::before': {
							content: '',
						},
						'code::after': {
							content: '',
						},
					},
				},
			}),
		},
	},
	plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};
