---
title: css代码规范化
date: 2018-06-11 11:47
---


## 意义？

#### 促进团队的协作。

提高更高的工作效率，减少沟通成本。

#### 降低维护成本

更容易让新人了解项目，更快的加入到项目中，维护代码成本降低。

#### 有助于个人的成长 

规范化，标准化，体现一个工程师的专业程度，对工程化的理解，也是一个程序员职业素养的体现。

#### 对项目的规划能力

规范的过程，也是你对项目的把控能力，如何把项目拆分成组件，把通用的样式抽离成方法。

## css特性

+ 选择器具有优先级
+ 规则之间可层叠

## 命名体系

+ [oocss](http://oocss.org/) - Object-Oriented CSS
    + 容器与外观分离
    + 内容与结构分离

+ [SMACSS](https://smacss.com/) Scalable and Modular Architecture for CSS
    + 将结构分离
    + 命名规范
    + css与html分离

+ [BEM](http://getbem.com/) - Block Element Modifier
## 良好的架构

+ 预测 - 可预见性
+ 复用
+ 维护
+ 延展

## 遇到的问题

+ 无意义的选择器与嵌套 （副作用：权重）
```css
ul.infoContRightList {}
p.Size {}
p.Name {}
```
+ 不规范的命名 （副作用：混乱）
```css
.Dw-b {}
.Tp-b {}
.left {
    width: 100px;
    background: #eee;
}
```
+ 缺少公共方法
+ 复用与分离
+ [Style Resources Loader](https://www.npmjs.com/package/style-resources-loader)

### 引用：
[漫談 CSS 架構方法 - 以 OOCSS, SMACSS, BEM 為例](https://www.slideshare.net/kurotanshi/css-oocss-smacss-bem)

---
title: css命名参考
date: 2018-06-20 14:53
---

## 模块划分

+ container
+ module / mod
+ card
+ article
+ side
+ tab
+ field

## 标签划分

+ btn
+ form
+ input
+ img

## 布局划分

+ colume
+ lf left
+ rt right
+ hd header
+ bd body
+ ft footer

## 状态划分

+ is-error
+ is-hidden
+ is-collapsed
+ is-active
+ is-disabed

## 实践

可以灵活的继承通用样式，覆盖某些规则，无副作用的添加样式。

```html
<div class="form activity__form">
    <div class="btn btn--disable activity__submit"></div>
</div>
```

## 学习

通过参考优秀的前端组件库来学习命名

+ https://getbootstrap.com/
+ http://semantic-ui.com/
+ https://foundation.zurb.com/
+ http://bulma.io/

## 参考

[BEM naming](http://getbem.com/naming/)

---
title: 一份项目内使用的的readme参考
date: 2018-06-19 15:33
---

# {{$page.title}}
> 引用

## 安装以及启动

不需要修改hosts文件，浏览器中打开<http://localhost:7878>。如果使用域名，则需要把域名指向本地，端口设置为80，浏览器中打开<http://\<PROJECT\>.com>。

安装yarn

```js
npm install
npm install -g nodemon & babel-cli
npm run dev
```

## 开发模式

执行命令结束后，浏览器中打开<http://localhost:3000>

注：js与less的编译文件为 `['js/*.js', 'js/**/index.js', 'less/*/*.less', 'less/**/index.less']`

```
npm run dev
---- or ----
gulp dev
```

## 风格指南

css规范 <https://github.com/airbnb/css>

js规范 <https://github.com/airbnb/javascript>

注释规范 <http://usejsdoc.org/>

vscode注释支持 <https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript>

编辑器格式化配置 <http://editorconfig.org/>

## CSS命名规范

使用BEM(block__element__modifier)命名规范，为避免样式覆盖，禁止.class选择器单独使用，可嵌套在符合BEM规范的选择器内，作子选择器使用。避免嵌套过多选择器，非重用模块除外。

```
.banner 
.home__banner ✅ 

.close 
.modal__login .close ✅
```

## js检查

使用prettier作为formatter，eslint作为lint。

vscode插件：

+ Prettier
+ EditorConfig for VS Code
+ ESLint
+ Vetur
+ Pug snippets

settings.json配置

```
"eslint.validate": [ "javascript", "javascriptreact", "html", "vue" ],
"prettier.eslintIntegration": true,
"prettier.stylelintIntegration": true
```

```
sudo gulp formatter
```
vue使用eslint-plugin-vue格式化代码，js文件使用eslint --fix格式化。
编辑器内可使用prettier插件。

```
  > format document
```

## 项目结构

```
common/ -- 后端或前后端通用js
controllers/ -- 前后端控制器
dist/ -- src编译后生成文件
doc/ -- 文档
middlewares/ --服务端中间件
node_modules/
routes/ -- 服务端路由
service -- 服务端代码
src/ -- 预编译文件
  js/
    util/ --引用工具包
    lib/ --单独引用库
  less/
    ui/ --通用ui
    common --只做注入css
  vue/
    components/ --组件
    controls/ --api
    mixins/ --混合
    pages/ --页面级single file
    routes/ --路由
    bus.js --事件中间
    domControl.js --vue中dom控制
    web.js --入口文件
    mobile.js --mobile入口
static/ -- 静态文件
target/ -- 压缩包文件
tasks/ -- 工作流任务
  .eslintrc.json -- 工作流eslint所需的配置
temp/ -- 打包临时目录
views/ -- 视图
tools/ -- 工具类
  pr.js -- 提交pr任务
app.js
boot.js -- 启动文件
gulpfile.babel.js
process.json -- PM2配置
yarn.lock
```

## 路由

路由尽量与文件目录相符，路由文件与视图文件对应。

## 视图

+ h5 - m.pug mobile.pug
+ hybird - h.pug hybird.pug
+ web - index.pug

## 全局变量

```
ctx.state.user {Object} - 当前登录用户
ctx.state.isLogin {Boolean} - 当前登录状态
ctx.state.ua {Object} - ua信息

global.cookieOptions - cookie设置
global.<PROJECT>_OAUTH - 认证信息
```

```
window._LOGIN {Boolean} - 是否登录
window._USER {Object} - 当前登录用户信息
```

## Cookie

页面之间的传递临时变量尽量使用session，存储非敏感信息使用storage，频繁使用的http状态使用cookie。

```
<PROJECT>_a_token //access token
<PROJECT>_r_token //refresh token
<PROJECT>_is_login //login state
u //uid 以及 匿名生成的uid
remember // 记住密码
```

## FBI WARNING

+ vue的挂载点为dom最顶层，所有dom操作应在vue mount生命周期之后。提供一个'vue-ready'事件，观察者函数单次载入，多次会覆盖之前的绑定。
+ gulp任务新增依赖后，需要手动清空部署机的cache文件。
+ 某些XMLHttpRequest POST请求返回400错误，需使用$.csrf发送请求，包装了请求token的逻辑。 
+ 关于请求跨域。开发模式中xmlHttpRequest通过cors.js由本地转发至线上。线上设置cors头或nginx把二级域名代理到\<PROJECT\>.com完成。

## 线上日志

## 编译机，部署机

## 提交PR
```
node tools/pr.js -a ${assign_id} -t ${target_branch}
```

## 查看PR相关
```
node tools/pr.js
```