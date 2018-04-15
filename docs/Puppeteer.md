## 架构图
![Puppeteer架构图](https://user-images.githubusercontent.com/746130/31592143-089f6f9a-b1db-11e7-9a20-16b7fc754fa1.png)

* **Puppeteer** 通过 devTools 与 browser 通信
* **Browser** 一个可以拥有多个页面的浏览器(chroium)实例
* **Page** 至少含有一个 Frame 的页面
* **Frame** 至少还有一个用于执行 javascript 的执行环境，也可以拓展多个执行环境