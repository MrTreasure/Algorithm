import * as path from 'path'
import * as puppeteer from 'puppeteer'
import mongo from '../lib/mongoDb'

import chalk from 'chalk'

const PDF_PATH = path.resolve(__dirname, '../../pdf')
const log = console.log

const TOTAL_PAGE = 50

interface IWriteData {
  link: string
  picture: string
  price: string | number
  title: string
  date: Date
}

async function main () {
  const browser = await puppeteer.launch()
  log(chalk.green('服务正常启动'))
  try {
    const page = await browser.newPage()
    page.on('console', msg => {
      if (typeof msg === 'object') {
        console.dir(msg)
      } else {
        log(chalk.blue(msg))
      }
    })

    await page.goto('https://s.taobao.com/search?q=gtx1080&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20180416&ie=utf8')
    log(chalk.yellow('页面初次加载完毕'))





    const handleData = async () => {
      const list = await page.evaluate(() => {
  
        const writeDataList: IWriteData[] = []
  
        let itemList = document.querySelectorAll('.item.J_MouserOnverReq')
        for (let item of itemList) {
          let writeData: IWriteData = {
            picture: undefined,
            link: undefined,
            title: undefined,
            price: undefined,
            date: undefined
          }
  
          let img = item.querySelector('img')
          writeData.picture = img.src
  
          let link: HTMLAnchorElement = item.querySelector('.pic-link.J_ClickStat.J_ItemPicA')
          writeData.link = link.href
  
          let price = item.querySelector('strong')
          writeData.price = ~~price.innerText
          
  
          let title: HTMLAnchorElement = item.querySelector('.title>a')
  
          writeData.title = title.innerText
  
          writeDataList.push(writeData)
        }
        return writeDataList
        
      })
      const result = await mongo.insertMany('GTX1080', list)

      log(chalk.yellow('写入数据库完毕'))
    }

    for (let i = 1; i <= 50; i++) {
      const pageInput = await page.$(`.J_Input[type='number']`)
      const submit = await page.$('.J_Submit')
      await pageInput.type('' + i)
      await submit.click()
      await page.waitFor(2500)

      console.clear()
      log(chalk.yellow(formatProgress(i)))
      log(chalk.yellow('页面数据加载完毕'))

      await handleData()
      await page.waitFor(2500)
    }

    await browser.close()
    log(chalk.green('服务正常结束'))
  } catch (error) {
    console.log(error)
    log(chalk.red('服务意外终止'))
    await browser.close()
  } finally {
    process.exit(0)
  }
}

function formatProgress (current: number): string {
  let percent = (current / TOTAL_PAGE) * 100
  let done = ~~(current / TOTAL_PAGE * 40)
  let left = 40 - done

  let str = `当前进度：[${''.padStart(done, '=')}${''.padStart(left, '-')}]   ${percent}%`

  return str

}

main()
