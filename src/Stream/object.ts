import { Readable, Writable, Transform } from 'stream'
import * as fs from 'fs'

class StringStream extends Readable {
  private data: string[] = []

  constructor (data, opt) {
    super(opt)
    this.data = data
  }

  _read () {
    if (this.data.length > 0) {
      this.push(this.data.shift())
    } else {
      this.push(null)
    }
  }
}

class StringTransform extends Transform {
  _transform (chunk, encoding, cb) {
    console.log(chunk)
    cb(chunk)
  }
}

const write = fs.createWriteStream('../../write.txt')

const stream = new StringStream(['H', 'E', 'L', 'L', 'O'], { objectMode: true })
const transform = new StringTransform()

transform.on('error', err => {
  console.error('err' + err)
})

stream.pipe(transform).pipe(write)
