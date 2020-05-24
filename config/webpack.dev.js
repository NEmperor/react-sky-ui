const path = require('path')
const { smart } = require('webpack-merge');
const base = require('./webpack.base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = smart(base, {
    mode: 'development',
    devServer:{  
        contentBase:path.join(__dirname, '../public'), // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
        host:'localhost', 
        // 如果publicPath: "/Test",那么public目录就相当于整个服务器，public目录下有一个Test文件夹，存放打包生成的文件
        publicPath:"/",  // 将用于确定应该从哪里提供 bundle, 此路径下的打包文件可在浏览器中访问
        //设置端口  
        port:8080,  
        //自动打开浏览器  
        open:true,
        hot:true,
        https: true,
        historyApiFallback: {
            disableDotRule: true
        }
    },
    devtool: 'inline-source-map',
    plugins:[new BundleAnalyzerPlugin()]
});
console.log(process.env.NODE_ENV)