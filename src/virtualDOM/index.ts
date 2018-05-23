import { h, init } from 'snabbdom'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'

const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const el = document.querySelector('#app')

const app = h('div#app', {}, 'Virtual Dom')

patch(el, app)
