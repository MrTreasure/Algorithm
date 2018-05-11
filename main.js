const obj = {
  a: 10
}

const fun = () => {
  console.log(this.a)
}

fun.call(obj)

fun()

