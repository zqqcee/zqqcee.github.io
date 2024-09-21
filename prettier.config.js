/** @type {import("prettier").Config} */
export default {
	printWidth: 100,
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
	plugins: ['prettier-plugin-astro'],
	overrides: [
		{
			files: ['.*', '*.md', '*.toml', '*.yml'],
			options: {
				useTabs: true,
			},
		},
		{
			files: ['**/*.astro'],
			options: {
				parser: 'astro',
				singleQuote: true,
				trailingComma: 'none',
				tabWidth: 2,
				semi: true,
			},
		},
		{
			files: ['*.tsx', '*.ts', '*.jsx', '*.js'],
			options: {
				singleQuote: true,
				// Print trailing commas wherever possible
				trailingComma: 'all',
				// Print spaces between brackets in object literals
				bracketSpacing: true,
				// Keep the arrow function parentheses always
				arrowParens: 'always',
				// Define how many spaces per indentation-level
				tabWidth: 2,
				// Use semicolons at the end of statements
				semi: true,
			},
		},
		{
			// For JSON files, always use double quotes and trailing commas
			files: '*.json',
			options: {
				singleQuote: false,
				trailingComma: 'none', // JSON doesn’t support trailing commas
				tabWidth: 2,
			},
		},
	],
};
