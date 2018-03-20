const fs = require('fs-extra')
const zlib = require('zlib')

const main = async () => {
  const file = await fs.readFile('./Treasure.png')
  zlib.gzip(file, (err, buffer) => {
    fs.writeFile('./Treasure.png.gz', buffer)
  })
}
main()