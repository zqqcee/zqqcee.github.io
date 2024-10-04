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
						'li::marker': {
							color: 'var(--tw-prose-bullets)',
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
			keyframes: {
				signatrue: {
					'0%, 100%': { strokeDashoffset: 2400 },
					'55%': { fill: '#fff' },
					'70%': { strokeDashoffset: 2000, fill: '#fff' },
					'100%': { strokeDashoffset: 2400, fill: 'transparent' },
				},
				signatruelogo: {
					'0%, 100%': { strokeDashoffset: 2550 },
					'34%': { strokeDashoffset: 5000, fill: 'transparent' },
					'35%': { fill: '#ffffff30' },
					'55%': { fill: '#ffffff' },
					'80%': { strokeDashoffset: 5000, fill: '#fff' },
					'100%': { strokeDashoffset: 2550, fill: 'transparent' },
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};
