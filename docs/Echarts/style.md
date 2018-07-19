1. 全局theme

2. option设置

   ```typescript
   interface option {
       color: string[]  // 全局主题
       series: type[
           {
               type: string // 系列的类型
               color: string[] // 配色方案
               itemStyle: {
                   color: string // 点的颜色
               }
               label: {
                   show: boolean
                   formatter: Function | string // 格式化
               }
               emphasis: { // 高亮
                   itemStyle: any
                   label: any
               }
           }
   	]
   }
   ```

   