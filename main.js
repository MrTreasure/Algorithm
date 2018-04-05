const MAX = 5
let count = 0

function fun() {
  if (count < MAX) {
    count++
    return fun()
  } else {
    return
  }
}

fun()