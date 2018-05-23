import { h, init } from 'snabbdom'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { vnode } from 'snabbdom/vnode'

const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const el = document.querySelector('#app')

const app = h('div#app', {hook: {
  pre: () => { console.log('the patch process begins') },
  init: vnode => { console.log('a vnode has been added', vnode) },
  create: (emptyVnode, vnode) => { console.log('a DOM element has been created based on a vnode', emptyVnode, vnode) },
  insert: (vnode) => { console.log('an element has been inserted into the DOM', vnode) },
  prepatch: (oldVnode, vnode) => { console.log('an element is about to be pathched', oldVnode, vnode) },
  update: (oldVnode, vnode) => { console.log('an element has being updated', oldVnode, vnode) },
  postpatch: (oldVnode, vnode) => { console.log('an element has been updated', oldVnode, vnode) },
  destroy: (vnode) => { console.log('an element is directly or indirectly being removed', vnode) },
  remove: (vnode) => { console.log('an element is directly being removed from the DOM', vnode) },
  post: () => { console.log('this patch process is done') }
} }, 'Hello Virtual Dom')

const newNode = h('div', { class: { red: true } }, [h('div', {}, '1'), h('div', {}, '2')])




const produceList = () => {
  const lrcList = ['细雨带风湿透黄昏的街道', '抹去雨水双眼无故地仰望', '望向孤单的晚灯是那伤感的记忆', '再次泛起心里无数的思念', '以往片刻欢笑仍挂在脸上', '愿你此刻可会知是我衷心的说声']
  const arr = lrcList.map(lrc => {
    return h('li', { class: { green: true } }, lrc)
  })
  console.log(arr)
  return arr
  
}

const nextNode = h('ul', { class: { blue: true } }, [h('li', {}, produceList())])

console.log('patch app')
patch(el, app)

setTimeout(() => {
  console.log('patch newNode')
  patch(app, newNode)
}, 2000)

setTimeout(() => {
  console.log('patch nextNode')
  patch(newNode, nextNode)
}, 3000)
