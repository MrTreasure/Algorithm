import * as path from 'path'
import * as puppeteer from 'puppeteer'
import mongo from '../lib/mongoDb'

import chalk from 'chalk'

const PDF_PATH = path.resolve(__dirname, '../../pdf')
const log = console.log

interface IWriteData {
  link: string
  picture: string
  price: string
  title: string
}

async function main () {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    page.on('console', msg => {
      if (typeof msg === 'object') {
        log(chalk.blue(msg.toString()))
      } else {
        log(chalk.blue(msg))
      }
    })

    await page.goto('https://s.taobao.com/search?q=gtx1070&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20180415&ie=utf8')
    log(chalk.green('页面加载完毕'))

    await page.waitFor(5000)
    log(chalk.green('页面数据加载完毕'))

    const list = await page.evaluate(() => {

      const writeDataList: IWriteData[] = []

      let itemList = document.querySelectorAll('.item.J_MouserOnverReq')
      for (let item of itemList) {
        let writeData: IWriteData = {
          picture: undefined,
          link: undefined,
          title: undefined,
          price: undefined
        }

        let img = item.querySelector('img')
        writeData.picture = img.src

        let link: HTMLAnchorElement = item.querySelector('.pic-link.J_ClickStat.J_ItemPicA')
        writeData.link = link.href

        let price = item.querySelector('strong')
        writeData.price = price.innerText
        

        let titleList = Array.from(item.querySelectorAll('.J_ClickStat')[1].querySelectorAll('span'))

        writeData.title = titleList.map(item => item.innerHTML).toString().trim()

        writeDataList.push(writeData)
      }
      return writeDataList
    })

    log(list)

    await browser.close()
    log(chalk.green('服务正常结束'))
  } catch (error) {
    console.log(error)
    log(chalk.red('服务意外终止'))
    // await browser.close()
  } finally {
    // process.exit(0)
  }
}

main()
