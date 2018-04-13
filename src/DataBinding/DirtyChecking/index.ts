// const providers = []

// const provider = {
//   greeting: 'Hello',
//   subject: 'World'
// }

// const consumer: HTMLParagraphElement = document.createElement('p')
// consumer.innerHTML = 'Data Binding'

// document.body.appendChild(consumer)

// observe(provider, 'greeting', msg => {
//   consumer.innerHTML = msg + '' + provider.subject
// })

// function observe (provider, prop, handler) {
//   provider._handlers[prop] = handler
// }

// // function digest () {
// //   providers.forEach(digestProvider)
// // }

// // function digestProvider (provider) {
// //   for (let prop in provider._handlers) {
// //     if (provider._prevValues[prop] !== provider[prop]) {
// //       provider._prevValues[prop] = provider[prop]
// //       handler(provider[prop])
// //     }
// //   }
// // }

(function (window) {
  let DUANZI = window[Symbol('DUANZI')] = []
  let DUANZI_TIMER = window[Symbol('DUANZI_TIMER')] = undefined

  window.addEventListener('click', () => {

    DUANZI.push(Date.now())

    if (DUANZI.length === 3 
    && (DUANZI[1] * 2) - (DUANZI[0] + DUANZI[2]) > 100) {
      DUANZI = []
      alert('滴, 滴滴')
    }

    if (DUANZI_TIMER) {
      return
    } else {
      DUANZI_TIMER = setTimeout(() => {
        DUANZI = []
        DUANZI_TIMER = undefined
      }, 500)
    }
  
  })
})(window)
