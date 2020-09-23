const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

console.log(CleanWebpackPlugin)
module.exports = {
	entry: {
		main: './src/index.js'
    },
    output: {
    filename: '[name].js',
    chunkFilename:'[name].[contenthash:8].chunk.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath:'/'
	},
	module: {
		rules: [
        {
            test: /\.tsx|\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        },
        {
          test: /\.(le|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // only enable hot in development
                hmr: true,
                // if hmr does not work, this is a forceful method.
                reloadAll: true,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  getLocalIdent: (context, localIdentName, localName, options) => {
                    const _path = context._module.context
                    const _name = path.parse(context._module.resource).name
            
                    if (_path.search(/node_modules/) !== -1) {
                        return localName
                    } else {
                        return localIdentName
                    }
                }
                },
                
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                lessOptions: {
                  strictMath: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|jpeg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 512,
                name: (resourcePath)=>{
                    const srcPath = path.resolve(process.cwd(),"src")
                    const name = path.relative(srcPath,resourcePath).split((path.sep)).join('/')
                    return name;
                }
              },
            },
          ],
        },
      ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
          "@": path.resolve(__dirname, '../src'),
        }
    },
    optimization: {
		splitChunks:{
			chunks: 'all',
		}
	},

	plugins: [new HtmlWebpackPlugin({
		template: './public/index.html'
    }), new CleanWebpackPlugin({
        protectWebpackAssets: false,
        // cleanAfterEveryBuildPatterns:['**/*'], // 表示打包完成后删除匹配的文件
    }),
    // new webpack.DllReferencePlugin({
		// 	manifest: path.resolve(__dirname, '../dll', 'vendor-manifest.json')
    // }),
    // new AddAssetHtmlWebpackPlugin({
		// 	filepath: path.resolve(__dirname, '../dll', 'vendor.dll.js')
		// }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: '[name].[contenthash:8].chunk.css',
    })
  ],
}