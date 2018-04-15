
const PromiseList = []

const getPromise = (msg) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(msg)
      resolve()
    }, msg * 1000)
  })
}

for (let i = 0; i < 10; i++) {
  PromiseList.push(getPromise(i))
}

async function main() {
  for (let i of PromiseList) {
    await i
  }
}
main()