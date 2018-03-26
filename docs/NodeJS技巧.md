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