
## 代码
```typescript
class React {
  static getDerivedStateFromProps(nextProps, nextState) {
    console.log('%c getDerivedStateFromProps', "color:#97de95")
    console.log(nextProps, nextState)
    return null
  }

  public shouldComponentUpdate(nextProps, nextState): boolean {
    console.log('%c shouldComponentUpdate', "color:#08c299")
    console.log(this.props, this.state)
    console.log(nextProps, nextState)
    // 具有缓存效应
    return true
  }

  public getSnapshotBeforeUpdate(preProps, preState): any {
    console.log('%c getSnapshotBeforeUpdate', "color:#0960bd")
    console.log(preProps, preState)
    return preProps.name
  }

  public render() {
    
  }

  public componentDidUpdate(preProps, preState, val) {
    console.log('%c componentDidUpdate', "color:#571179")
    console.log(preProps, preState, val)
  }
}
```
## 结论