import EventCenter from '@/common/EventCenter'
import { action, computed, observable } from 'mobx'

import { GET_TIME } from '../../../components/common'

class Store {
  
  @observable
  public xAxis: any[] = []

  @observable
  public pass: any[] = [120, 132, 101, 134, 90, 230, 210, 820, 932, 901, 934, 1290, 1330, 1320]

  @observable
  public fail: any[] = [220, 182, 191, 234, 290, 330, 310, 820, 932, 901, 934, 1290, 1330, 1320,220, 182, 191, 234, 290, 330, 310, 820, 932]

  @observable
  private today: any[] = []

  @computed
  public get diff() {
    
    return {
      xAxis: {
        data: this.xAxis
      }
    }
  }

  private week: string[] = ['2018/07/12', '2018/07/13', '2018/07/14', '2018/07/15', '2018/07/16', '2018/07/17', '2018/07/18', '2018/07/19']

  constructor() {
    this.today = GET_TIME()
    this.xAxis = this.today
  }

  @action
  public handleWeek() {
    
    // (this.xAxis as IObservableArray).clear()

    // for (let item of this.week) {
    //   this.xAxis.push(item)
    // }
    this.xAxis = this.week

    EventCenter.emit('update')
  }

  @action
  public handleDay() {
    // (this.xAxis as IObservableArray).clear()
    // for (let item of this.today) {
    //   this.xAxis.push(item)
    // }
    this.xAxis = this.today
    EventCenter.emit('update')
  }
}

const store = new Store()

export default store