import * as axios from 'axios'

const map = new Map()



function map2Obj(map) {
  let obj = Object.create(null)
  for (let [k,v] in map) {
    obj[k] = v
  }
  return obj
}

process.on('beforeExit', () => {

})