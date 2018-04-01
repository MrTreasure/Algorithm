const axios = require('axios')
const fs = require('fs-extra')

const map = new Map()

const MAX = 1000

for (let i = 0; i < MAX; i++) {
  axios.get('http://localhost:2001')
    .then(res => {
      const data = res.data
      if (map.has(data.pid)) {
        let count = map.get(data.pid)
        map.set(data.pid, ++count)
      } else {
        map.set(data.pid, 0)
      }
    })
    .catch(err => {
      console.log(err)
    })
}

function map2Obj(map) {
  let obj = Object.create(null)
  for (let [k,v] of map) {
    obj[k] = v
  }
  return obj
}

process.on('exit', async () => {
  let obj = map2Obj(map)
  let str = JSON.stringify(obj)
  console.log(str)
  await fs.writeJson('./cluster.json', obj)
})