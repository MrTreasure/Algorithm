import { Readable, Writable, Duplex, Transform } from 'stream'
import { StringDecoder } from 'string_decoder'
import * as fs from 'fs-extra'
import * as dns from 'dns'

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

class Counter extends Readable {
  private max = 100
  private index = 1

  constructor (opt?) {
    super(opt)
  }

  _read () {
    const i = this.index++
    if (i > this.max) {
      this.push(null)
    } else {
      const str = i + ''
      const buf = Buffer.from(str)
      this.push(buf)
    }
  }
}

dns.lookup('tencent.cn', (err, address, family) => {
  if (err) console.error(err)
  console.log('IP 地址: %j 地址族: IPv%s', address, family)
})

dns.resolve('tencent.com', (err, address) => {
  if (err) console.error(err)
  console.log('IP 地址: %j', address)
})
