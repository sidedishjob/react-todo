const webpack = require("webpack");

module.exports = function override(config) {
	config.resolve.fallback = {
		...config.resolve.fallback,
		fs: false,
		path: require.resolve("path-browserify"),
		crypto: require.resolve("crypto-browserify"),
		stream: require.resolve("stream-browserify"),
		vm: require.resolve("vm-browserify"),
	};

	config.plugins = [
		...config.plugins,
		new webpack.ProvidePlugin({
			process: "process/browser",
			Buffer: ["buffer", "Buffer"],
		}),
	];

	return config;
};