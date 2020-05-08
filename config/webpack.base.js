const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log(CleanWebpackPlugin)
module.exports = {
	entry: {
		main: './src/index.tsx'
    },
    output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules: [{
            test: /\.tsx|\.js?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

	plugins: [new HtmlWebpackPlugin({
		template: './public/index.html'
    }), new CleanWebpackPlugin({
        protectWebpackAssets: false,
        // cleanAfterEveryBuildPatterns:['**/*'], // 表示打包完成后删除匹配的文件
    })],
}