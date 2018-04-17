import { Readable, Writable, Duplex, Transform } from 'stream'
import { StringDecoder } from 'string_decoder'

class StringWritable extends Writable {
  public data: any = ''

  private state: boolean
  private _decoder = new StringDecoder('utf8')
  private length = 0


  constructor (options?) {
    super(options)
  }

  _write (chunk, encoding, callback) {
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk)
    }
    this.data += chunk
    callback()
  }

  _final (callback) {
    this.data += this._decoder.end()
    callback()
  }
}
const euro = [[0xE2, 0x82], [0xAC]].map(Buffer.from)
const w = new StringWritable()

w.write('currency: ')
w.write(euro[0])
w.end(euro[1])


console.log(w.data) // currency: €
