## babel 打包库

### 配置.babelrc.js
* modules: "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false, defaults to "auto".

   Enable transformation of ES6 module syntax to another module type.

```js
const outputModule = process.env.OUTPUT_MODULE;
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: outputModule || false,
        targets: {node: '8.11.1'}, // 支持 async await
      }
    ],
    "@babel/preset-react"
  ],
};


```
## 发布
* `npm info <name>`可以查看包名的相关信息，用来确定包的名字可不可以使用
* `npm whoami` 查看登录状态
* npm login
* npm publish

package.json
* files: 表明上传的文件，如果没有这个字段，根据.gitignore文件
```
"files": [
    "lib",
    "es"
  ],
```
