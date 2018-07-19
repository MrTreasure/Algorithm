import './index.less'

import { Title } from '@/components/Title'
import { Card } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'

import { generateEChart } from '../../../components/Base'
import { COLOR2 } from '../../../components/common'
import store from './store'



const Line = generateEChart('line')

@observer
export class Tendency extends React.Component {

  constructor(props) {
    super(props)
  }

  public state = {
    opt: {
      color: COLOR2,
      title : {text : "认证通过量趋势"},
      tooltip: {
          trigger: "axis"
      },
      legend: {
          data:["认证通过量","认证拦截量"]
      },
      grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
      },
      xAxis: {
          type: "category",
          boundaryGap: false,
          data: store.xAxis
      },
      yAxis: {
          type: "value"
      },
      series: [{
          name : "认证通过量",
          data: store.pass,
          type: "line"
      },{
          name : "认证拦截量",
          data: store.fail,
          type: "line"
      }]
    }
  }

  public hanldeConfirm():void {
    console.log(1)
  }

  public handleToday():void {
    store.handleDay()
  }

  public handleWeek():void {
    store.handleWeek()

  }

  public handleMonth():void {
    console.log(1)
  }

  public render() {
    return (
      <div className="tendency">
        <Card title={<Title confirm={this.hanldeConfirm}  today={this.handleToday} week={this.handleWeek} month={this.handleMonth}/>}>
          <Line opt={this.state.opt} height="65vh" diff={store.diff} debug={true}/>
        </Card>
      </div>
    )
  }
}