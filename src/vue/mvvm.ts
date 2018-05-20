class Compile {
  private el: HTMLElement
  private vm: MVVM

  constructor (el: any, vm: MVVM) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    if (this.el) {
      const fragment = this.node2fragment(this.el)

      this.compile(fragment)

      this.el.appendChild(fragment)
    }
  }

  // 辅助方法
  private isElementNode (node) {
    return node.nodeType === 1
  }

  private isDirective (name: string) {
    return name.includes('v-')
  }

  // 核心方法
  private compileElement (node: Element) {
    let attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        let expr = attr.value
        let [, type] = attrName.split('-')

        CompileUtil[type](node, this.vm, expr)
      }
    })
  }

  private compileText (node: Element) {
    let expr = node.textContent
    let reg = /\{\{([^}]+)\}\}/g
    if (reg.test(expr)) {
      CompileUtil['text'](node, this.vm, expr)
    }
  }

  private compile (fragment: Element) {
    let childNodes = fragment.childNodes
    Array.from(childNodes).forEach((node: Element) => {
      if (this.isElementNode(node)) {
        this.compileElement(node)
        this.compile(node)
      } else {
        this.compileText(node)
      }
    })
  }

  private node2fragment (el): DocumentFragment {
    const fragment = document.createDocumentFragment()
    let firstChild
    while (firstChild === el.firstChild) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }
}

class MVVM {

}

class CompileUtil {
  static updater = {
    textUpdate (node: Element, value: any) {
      node.textContent = value
    },
    modelUpdater (node: Element, value) {
      node.nodeValue = value
    }
  }

  static text (node: Element, vm: MVVM, expr: any) {
    let updateFn = this.updater['textUpdater']
    updateFn && updateFn(node, expr)
  }

  static model (node: Element, vm: MVVM, expr: any) {
    let updateFn = this.updater['modelUpdater']
    updateFn && updateFn(node, expr)
  }
}

