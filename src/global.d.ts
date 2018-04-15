export {}

// 在具体的调用过程中
// global['Treasure'] = {
//   getName() {

//   },
//   a: 0,
//   b: 'Treasure'
// }
declare global {
  namespace Treasure {
    function getName(): string
    var a: number
    let b: string
  }
}


declare module 'koa-router' {
  function extraMehtod(): void
}

