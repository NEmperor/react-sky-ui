## ts的编译
1. ts-loader 编译的时候可以进行类型检查， 新项目使用
2. babel-loader @/babel/preset-typescript  不能进行检查，旧项目一般使用

### ts-loader的配置
1. ts-loader 依赖 typescritp:  npm i typescript -D,执行npm run start,提示
The 'files' list in config file 'tsconfig.json' is empty.
2. 执行tsc --init
3. 执行npm i @types/react  @types/react-dom -S
4. 提示 Cannot use JSX unless the '--jsx' flag is provided，修改tsconfig.json的jsx属性的值为"react"
preserve 保留jsx语法和tsx后续   react-native 保留jsx语法但会把后缀改为js react 不保留jsx语法直接编译成es5.后缀改为js
```json
{
    test: /\.tsx | \.js?$/,
    use: 'ts-loader',
    exclude: /node_modules/
}
```
### ts-loader也可以处理js文件
* 入口文件改成js文件也可以正常运行 要明白ts-loader做了哪些事
index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

## tsconfig.json配置
如果tsx文件要引入js文件写的组件，需要将"allowJs"属性设置成true

## eslint配置
* 没有配置前，有错误提示，但是不影响运行
### eslint的安装和配置
```
npm i eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```