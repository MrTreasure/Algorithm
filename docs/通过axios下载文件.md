```javascript
function ACTION.DOWN_LIST(id) {
  // 设置请求响应类型为blob
  return axios.post(URL, { id }, {responseType: 'blob'}).then(res => res.data)
}

async downloadExcel (id) {
  //导出表格
  let data = await ACTION.DOWN_LIST(id);
  if(data.size < 1) {
    this.$message.error('没有可导出数据');
    return false;
  }
  const content = data;
  // 新建一个blob对象
  const blob = new Blob([content]);
  if(window.navigator.msSaveOrOpenBlob) {
    //如果是IE浏览器
    navigator.msSaveBlob(blob, '审计管理.xls');
  } else {
    const elink = document.createElement('a'); // 创建a标签
    elink.download = '审计管理.xls'; // 文件名
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click(); // 触发点击a标签事件
    document.body.removeChild(elink);
  }
}
```