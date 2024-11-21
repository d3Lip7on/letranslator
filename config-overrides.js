// config-overrides.js
const path = require('path');

module.exports = function override(config) {
	config.resolve.alias = {
		...config.resolve.alias,
		'@App': path.resolve(__dirname, 'src/App'),
		'@Pages': path.resolve(__dirname, 'src/Pages'),
		'@Shared': path.resolve(__dirname, 'src/Shared'),
		'@Features': path.resolve(__dirname, 'src/Features/'),
		'@Widgets': path.resolve(__dirname, 'src/Widgets/'),
		'@Entities': path.resolve(__dirname, 'src/Entities/'),
	};
	return config;
};
