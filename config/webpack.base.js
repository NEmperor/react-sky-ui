const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log(CleanWebpackPlugin)
module.exports = {
	entry: {
		main: './src/index.js'
    },
    output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../dist')
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
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: '[id].css',
    })
  ],
}