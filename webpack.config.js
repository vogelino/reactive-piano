const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /.md?$/,
				loader: 'raw-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(jpe?g|png|gif|svg|mp4)$/i,
				use: 'file-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(ogg|mp3|wav|mpe?g)$/i,
				use: 'file-loader',
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		publicPath: '/',
		contentBase: './public',
		hot: false,
	},
	plugins: [
		new HtmlWebpackPlugin({ title: process.npm_package_title }),
	],
};
