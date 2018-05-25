## virtualDOM Diff过程(未完工)
1. 同层级比较，不跨级比较
2. 找到diff关键属性
  1. 组件tagname(div, a, ul等)不一致跳过
  2. 列表组件key不一致并且旧树无新key或反之(跳过则完全重新渲染该节点)
3. 减少diff所需的判断
  1. 减少组件属性
  2. 钩子函数跳过比对的shouldComponentUpdate/PureRenderMixin/PureComponent
  3. 不可变属性

## diff过程中的可能性
* 整个元素不一样，即元素被replace掉
* 元素的attrs不一样
* 元素的text文本不一样
* 元素顺序被替换，即元素需要reorder

```javascript
interface VNnode {
  props?: Props;
  attrs?: Attrs;
  class?: Classes;
  style?: VNodeStyle;
  dataset?: Dataset;
  on?: On;
  hero?: Hero;
  attachData?: AttachData;
  hook?: Hooks;
  key?: Key;
  ns?: string; // for SVGs
  fn?: () => VNode; // for thunks
  args?: Array<any>; // for thunks
  [key: string]: any; // for any other 3rd party module 
}
```