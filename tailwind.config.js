const colorScheme = require('./src/Shared/styles/colorScheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}', // указываем путь к файлам
	],
	theme: {
		extend: {
			colors: {
				...colorScheme,
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
