##结论
1. ```import { Card } from 'antd'```并不会触发按需加载,仍然会加载全部antd文件,应该使用```import Card from 'antd/lib/Card'```
2. 使用变量加载```require('highlight.js/styles/' + this.props.style)``` webpack会打包 ```'highlight.js/styles/*'```下所有文件
3. 猜想 在TS下即使只从某个库里引用接口, ```import { IXxx } from 'xxx'```,webpack仍然会打包所有的 'xxx' 文件(在ECharts的表现下如此)