const path 					= require('path');
const webpack 				= require('webpack');
const CleanWebpackPlugin 	= require('clean-webpack-plugin');
const HtmlWebpackPlugin 	= require('html-webpack-plugin');
const ExtractTextPlugin 	= require('extract-text-webpack-plugin');
const UglifyJsPlugin 		= webpack.optimize.UglifyJsPlugin;
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const autoprefixer 			= require('autoprefixer');
require("babel-polyfill");

// var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

console.log('* ',path.join(__dirname, 'node_modules'))
var plugins = [
	// new CleanWebpackPlugin(['build'], {
	// 		verbose: true
	// 	}),
  // new LodashModuleReplacementPlugin,
  // new webpack.optimize.OccurrenceOrderPlugin,
	// new ExtractTextPlugin('css/app.css', { allChunks: true })
];



var config = {
  // context: __dirname + "/src",
	entry: './src/index',//path.join(__dirname,'./src/index.js'),
	devtool: 'source-map',
	output: {
		path: path.join(__dirname,'dist'),
		filename: 'mp.js',
		// library: 'MP',
		// libraryTarget: 'umd',
		// umdNamedDefine: true
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [
          path.resolve(__dirname, './src'),
          // path.resolve(__dirname, './node_modules')
          // path.resolve(__dirname, './src/utils')
					// PATHS.demo
				],
        exclude: /node_modules/,
				query: {
					presets: ['es2015'],

				},
        // 'plugins': ['lodash'],
        // resolveLoader: {
        //   root: path.join(__dirname, 'node_modules')
        // }
			}
		]
	},
	stats: {
		colors: true
	},
  target: 'node',
  // resolve: {
  //   modulesDirectories: ["./node_modules"]
  // },
  exclude: /node_modules/,
  // resolveLoader: {
  //   root: path.resolve(__dirname, 'node_modules')
  // },

	plugins: plugins,
};

module.exports = {
  entry: './src/index',//path.join(__dirname,'./src/index.js'),
  devtool: 'source-map',
  target: 'node',
  // exclude: /node_modules/,
  output: {
    path: path.join(__dirname,'dist'),
    filename: 'mp.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, './src'),
          // path.resolve(__dirname, './node_modules')
          // path.resolve(__dirname, './src/utils')
          // PATHS.demo
        ],
        // exclude: /node_modules/,
        query: {
          presets: ['es2015'],

        },
        // 'plugins': ['lodash'],
        // resolveLoader: {
        //   root: path.join(__dirname, 'node_modules')
        // }
      }
    ]
  },
};
