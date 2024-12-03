import { color } from 'framer-motion';
import { blockquote } from 'framer-motion/client';

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
						strong: {
							color: theme('colors.white'),
						},
						a: {
							color: theme('colors.white'),
							transition: 'all 0.3s ease-in-out',
							'text-decoration-color': '#ffffff',
							'&:hover': {
								'text-decoration-color': '#67e8f9',
								color: '#67e8f9',
							},
						},
						// p: {
						// 	color: theme('colors.white'),
						// },
						code: {
							color: theme('colors.white'),
							borderRadius: '.25rem',
							color: '#ffffff',
							fontSize: '.875em',
							fontWeight: '550',
							padding: '.15rem .4rem',
							backgroundColor: '#44494c',
						},
						'code::before': {
							content: 'none',
						},
						'code::after': {
							content: 'none',
						},
						'li::marker': {
							color: 'var(--tw-prose-bullets)',
						},
						blockquote: {
							p: {
								'&::before': { content: 'none' },
								'&::after': { content: 'none' },
							},
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
			screens: {
				lg: '900px',
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};
