const providers = []

const provider = {
  greeting: 'Hello',
  subject: 'World'
}

const consumer: HTMLParagraphElement = document.createElement('p')
consumer.innerHTML = 'Data Binding'

document.body.appendChild(consumer)

observe(provider, 'greeting', msg => {
  consumer.innerHTML = msg + '' + provider.subject
})

function observe (provider, prop, handler) {
  provider._handlers[prop] = handler
}

// function digest () {
//   providers.forEach(digestProvider)
// }

// function digestProvider (provider) {
//   for (let prop in provider._handlers) {
//     if (provider._prevValues[prop] !== provider[prop]) {
//       provider._prevValues[prop] = provider[prop]
//       handler(provider[prop])
//     }
//   }
// }
