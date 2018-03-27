const arr = [3, 5, 6, 2, 4, 5, 1, 11]
for (let item of arr) {
  setTimeout(() => {
    console.log(item)
  }, item * 100)
}