## string
javascript中的普通值

## ArrayBuffer
javascript中的二进制类型，是一个数组；在前端通常以ArrayBuffer的形式出现，在后台以buffer的形式出现

## Blob
binary large object，二进制大对象，通常通过canvas或者构造函数产生

## File对象
通过```<input type="file"/>``` 上传的对象，通过files获得这个表单控件的fileslist


## 相互转换
```javascript
// string 转 Blob 对象
const blob = new Blob(['Treasure'], {type: 'text/plain'})

// TypeArray 转 Blob 对象
const array = new Unit16Array([84, 114, 101, 97, 115, 117, 114, 101])
const blob = new Blob([array])
const reader = new FileReader()
reder.readAsText(blob, 'utf-8')
reader.onload = function(e) {console.log(result)}

// Blob 转 ArrayBuffer
const blob = new Blob(['Treasure'], {type: 'text/plain'})
const reader = new FileReader()
reader.readArrayBuffer(blob)
reader.onload = function (e) {
  cconsole.log(reader.result)
}
```

## 上传图片并预览
```javascript
const file = input.files[0]

// 同步的方法
const url = window.URL.createObjectURL(file)
img.src = url
```

## 从剪贴板中获取图片
```javascript
document.addEventListener('paste', function(e) {
  if (e.clipboardData.items[0].type === 'image/png') {
    const blob = e.clipboardData.items[0].getAsFile()
    const reader = new FileReader()
    reader.onload = function (e) {
      const img = document.createElement('img')
      img.height = 400
      img.width = 300
      img.src = e.target.result
      document.body.appendChild(img)

    }
    reader.readAsDataURL(blob)
  }
})
```

## websocket获取图片
```javascript
wx.onmessage = e => {
  if (typeof (e.data) !== 'string') {
        const reader = new FileReader()
    reader.onload = function (e) {
      const img = document.createElement('img')
      img.height = 400
      img.width = 300
      img.src = e.target.result
      document.body.appendChild(img)

    }
    reader.readAsDataURL(e.data)
  }
}
```