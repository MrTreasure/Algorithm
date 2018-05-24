import * as path from 'path'
import * as puppeteer from 'puppeteer'
import mongo from '../lib/mongoDb'

import chalk from 'chalk'

interface ILocal {
  name: string
  img: string
  areaList: IArea[]
  type: Type.LOCAL
}

interface IArea {
  name: string
  img: string
  schoolList: ISchool[]
  type: Type.AREA
}

interface ISchool {
  name: string
  img: string
  articalList: IArtical[]
  type: Type.SCHOOL
}

interface IArtical {
  title: string
  content: string
  type: Type.ARTICAL
}

enum Type {
  LOCAL,
  AREA,
  SCHOOL,
  ARTICAL
}
