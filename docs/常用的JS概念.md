## new操作发生了些什么
1. 新建一个object，原型是 object
2. 将这个新建的object的原型(__proto__)指向constructor的原型(prototype)
3. 将this这个变量指向这个新建的object
4. 执行构造函数中的方法
5. 除非构造函数显示的返回的一个非空非null的引用，否则返回这个对象