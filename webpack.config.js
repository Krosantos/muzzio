const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CssModuleLoader = {
	loader: 'css-loader',
	query: {
		localIdentName: '[local]__[hash:base64:5]',
		modules: true,
	},
};

module.exports = {
	devServer: {
		contentBase: path.join(__dirname, 'src', 'static'),
		port: 3000,
	},
	entry: './src/index.js',
	module: {
		rules: [{
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			options: { presets: ['@babel/preset-env'] },
			test: /\.(js|jsx)$/,
		},
		{
			rules: [{
				test: /\.(scss|css)$/,
				use: [
					// fallback to style-loader in development
					process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
					CssModuleLoader,
					'sass-loader',
				],
			}],
		},
		{
			test: /\.env$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '.env',
				},
			}],
		},
		{
			test: /\.html$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			}],
		},
		{
			test: /\.(png|svg|jpg|gif)$/,
			use: [
				'file-loader',
			],
		},
		{
			test: /\.(eot|ttf|woff|woff2)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'fonts/',
					publicPath: 'fonts/',
				},
			}],
		},
		],
	},

	node: {
		fs: 'empty',
	},
	output: {
		filename: 'bundle.js',
		publicPath: '/',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin(),
	],
	resolve: {
		alias: {
			'@api': path.resolve(__dirname, 'src', 'api'),
			'@components': path.resolve(__dirname, 'src', 'components'),
			'@constants': path.resolve(__dirname, 'src', 'constants'),
			'@contexts': path.resolve(__dirname, 'src', 'contexts'),
			'@hooks': path.resolve(__dirname, 'src', 'hooks'),
			'@static': path.resolve(__dirname, 'src', 'static'),
			'@theme': path.resolve(__dirname, 'src', 'theme'),
			'@utils': path.resolve(__dirname, 'src', 'utils'),
		},
		extensions: ['*', '.js', '.jsx'],
	},
};
