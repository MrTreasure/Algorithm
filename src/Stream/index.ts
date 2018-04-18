import { Readable, Writable, Duplex, Transform } from 'stream'
import { StringDecoder } from 'string_decoder'
import * as fs from 'fs-extra'
import * as dns from 'dns'

const rs = new Readable()

let c = 97

rs._read = function () {
  rs.push(String.fromCharCode(c++))
  if (c > 'z'.charCodeAt(0)) rs.push(null)
}

rs.pipe(process.stdout)
const ws = new Writable()

ws._write = function (chunk, encoding, next) {
  console.dir(chunk)
  next()
}

process.stdin.pipe(ws)
