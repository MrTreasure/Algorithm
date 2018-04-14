export {}

declare global {
  namespace Treasure {
    function getName(): string
  }
}

// declare namespace Router {
//   function extraMethod():void
// }

declare module 'koa-router' {
  function extraMehtod(): void
}

