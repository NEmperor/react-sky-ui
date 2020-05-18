# css
1. webpack alias配置的别名在css文件中不能使用，需要添加前缀 ~ 
To import assets from a node_modules path (include resolve.modules) and for alias, prefix it with a ~

2. 图片的输出地址

url-loader

* fallback:   Type: String Default: 'file-loader'
* Specifies an alternative loader to use when a target file's size exceeds the limit set in the limit
* The fallback loader will receive the same configuration options as url-loader.
```
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
```