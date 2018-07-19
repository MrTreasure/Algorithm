// import { EChartOption, ECharts, init } from 'echarts'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

import EventCenter from '@/common/EventCenter'
import * as ECharts from 'echarts'
import * as React from 'react'

// import { getEChartPath } from './common'



interface InitConfig {
  devicePixelRatio?: number
  renderer?: string
  width?: number | string
  height?: number | string
}

interface IProps {
  width?: string | number
  height?: string | number
  theme?: object
  config?: InitConfig
  opt: ECharts.EChartOption | any
  series?: any[]
  dynamic?: boolean,
  diff?: any
  debug?: boolean
}

export const generateEChart = (components: string | string[], isMap?: boolean) => {

  class Base extends React.Component<IProps, any> {

    public chartDOM: HTMLDivElement | HTMLCanvasElement
    public chart: ECharts.ECharts
    public option: ECharts.EChartOption
  
    constructor (props) {
      super(props)
      this.handleDOMChange = this.handleDOMChange.bind(this)
      if (this.props.dynamic) {
        this.handleUpdate = this.handleUpdate.bind(this)
      }
      if (isMap) {
        require('echarts/map/js/china')
      }
    }
  
    public async componentDidMount () {
      // try {
      //   if (Array.isArray(components)) {
      //     await Promise.all(components.map(path => {
      //       import('echarts/lib' + getEChartPath(path)).catch(err => {
      //         console.error(err)
      //       })
      //     })).catch(error => {
      //       console.error(error)
      //     })
      //   } else {
      //     await import('echarts/lib' + components)
      //   }
      // } catch (error) {
      //   console.error(error)
      // }


      let { theme, config } = this.props
      
      theme = theme || {}
      config = config || {}

      this.option = this.props.opt
      
      // 延迟 500ms 等待外层 DOM 正确初始化
      setTimeout(() => {
        this.props.debug && console.log('mount')
        this.chart = ECharts.init(this.chartDOM, theme, config)
        this.chart.setOption(this.option)
      }, 500)


      EventCenter.on('resize', this.handleDOMChange)
      if (this.props.dynamic) {
        EventCenter.on('update', this.handleUpdate)
      }
    }

    public getSnapshotBeforeUpdate () {
      this.props.debug && console.log('snapshot', this.props.diff)
      if (this.props.diff) {
        this.chart && this.chart.setOption(this.props.diff)
      }
      return null
    }
    
    public componentWillUnmount () {
      this.props.debug && console.log('unmount')
      this.chart && this.chart.dispose()
      delete this.chart
      EventCenter.off('echart', this.handleDOMChange)
      if (this.props.dynamic) {
        EventCenter.off('update', this.handleUpdate)
      }
    }

    public handleUpdate () {
      this.props.debug && console.log('update')
      this.chart && this.chart.setOption(this.option)
    }
  
    public render () {
      const { width, height } = this.props
      return (
        <div
          className='echart'
          style={{ width: width ? width : '100%', height: height ? height : 300 }}
          ref={dom => {dom && (this.chartDOM = dom)}}/>
      )
    }
    
    private handleDOMChange () {
      this.props.debug && console.log('DOM change')
      this.chart && this.chart.resize()
    }


  
  }

  return Base
}
