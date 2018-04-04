function test() { 
  console.log('test')
  setTimeout(() => test(), 0);
}
test()