## Node项目目录结构最佳实践
* 按照功能组织目录结构而不是规则
```bash
// DON'T
.
├── controllers
|   ├── product.js
|   └── user.js
├── models
|   ├── product.js
|   └── user.js
├── views
|   ├── product.hbs
|   └── user.hbs

// DO
.
├── product
|   ├── index.js
|   ├── product.js
|   └── product.hbs
├── user
|   ├── index.js
|   ├── user.js
|   └── user.hbs
```
* 不要在```index.js```文件中写入业务逻辑
```javascript
// product/index.js
var product = require('./product')

module.exports = {
  create: product.create
}
```
* 测试文件应该放在它们的实现旁边
```bash
.
├── test
|   └── setup.spec.js
├── product
|   ├── index.js
|   ├── product.js
|   ├── product.spec.js
|   └── product.hbs
├── user
|   ├── index.js
|   ├── user.js
|   ├── user.spec.js
|   └── user.hbs
```
* 使用 ```config```目录
```bash
.
├── config
|   ├── index.js
|   └── server.js
├── product
|   ├── index.js
|   ├── product.js
|   ├── product.spec.js
|   └── product.hbs
```
* 将你很长的 npm 脚本代码写入一个 脚本目录
```bash
.
├── scripts
|   ├── syncDb.sh
|   └── provision.sh
├── product
|   ├── index.js
|   ├── product.js
|   ├── product.spec.js
|   └── product.hbs
```

```javascript
# 利用 querysString 切割文本
const weirdoString = `name:Sophie;shape:fox;condition:new`;
const result = querystring.parse(weirdoString, `;`, `:`);

// result:
// {
//   name: `Sophie`,
//   shape: `fox`,
//   condition: `new`,
// };
```
```javascript
# 路径解析
myFilePath = `/someDir/someFile.json`;
path.parse(myFilePath).base === `someFile.json`; // true
path.parse(myFilePath).name === `someFile`; // true
path.parse(myFilePath).ext === `.json`; // true
```
```javascript
# 结束符硬编码
const fs = require(`fs`);

// bad
fs.readFile(`./myFile.txt`, `utf8`, (err, data) => {
  data.split(`\r\n`).forEach(line => {
    // do something
  });
});

// good
const os = require(`os`);
fs.readFile(`./myFile.txt`, `utf8`, (err, data) => {
  data.split(os.EOL).forEach(line => {
    // do something
  });
});
```
```javascript
# 状态码查询
someResponse.code === 301; // true
require(`http`).STATUS_CODES[someResponse.code] === `Moved Permanently`; // true
```
```javascript
# 高精度时间
const NS_PER_SEC = 1e9;
const time = process.hrtime();
// [ 1800216, 25 ] 第一次返回当前的高精度时间

setTimeout(() => {
  const diff = process.hrtime(time);
  // [ 1, 552 ] 

  console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
  // benchmark took 1000000552 nanoseconds
}, 1000);
```
```javascript
# 当无其他循环事件时推出 Timeout
const dailyCleanup = setInterval(() => {
  cleanup();
}, 1000 * 60 * 60 * 24);

dailyCleanup.unref();
```

```javascript
// 这两个都会遍历原型链上的属性（不包含方法）
Object.keys()
for (let key in obj) {
  console.log(key)
}
// 只会获得对象本身的key，不包含原型链
Object.getOwnPropertyNames()
// 箭头函数不能用作 构造函数是因为缺少[[construct]]属性
() => {}
```