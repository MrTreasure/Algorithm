const babylon = require('babylon')
const fs = require('fs-extra')

const opt = {
  sourceType: 'module'
}

async function main() {
  let script = await fs.readFile('script.js')
  script = script.toString()
  const output = babylon.parse(script, opt)
  fs.writeFile('output.json', JSON.stringify(output))
}

main()