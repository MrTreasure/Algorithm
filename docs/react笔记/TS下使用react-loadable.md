```typescript
// /src/Treasure
export default class Treasure extends React.Component {
  public render() {
    return (
      <div>Treasure</div>
    )
  }
}
```

```typescript
// /src/App
import * as Loadable from 'react-loadabel'
import ReactLoading from 'react-loading'

const Treasure = Loadable({loader: () => import('/src/Treasure'), loading: ({ type, color }) => <ReactLoading type={type} color={color} height={667} width={375} />})
class App extends React.Component{
  public render() {
    return (
      <Treasure />
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)
```


```bash
npm install babel-plugin-import --dev
```

1. 安装 baebl-plugun-imort 插件，否则会报不识别 import() 错误
2. 路由级组件一定要通过 export default 默认导出，否则TS下import会报找不到组件的错误
3. Loadable配置项必须有 loading 参数，推荐 react-loading