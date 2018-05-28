## 从输入URL到浏览器显示
1. 预处理URL，http网站加80端口，https网站加443端口
2. DNS解析
    1. 从浏览器本身DNS缓存查找结果
    2. 读取系统的DNS缓存
    3. 读取hosts文件
    4. 向dns服务器查询
3. Socket发送数据
    1. 调用系统库函数socket
    2. 交给传输层，封装成TCP segment
    3. 交给网络层，加入IP头部 TCP packet
    4. 交给链路层，加入frame头部
4. 数据传输
    * 以太网
    * WIFI
    * 蜂窝移动网络
    
    IP数据头报头部**time to live(TTL)** 每经过一个路由器就减1，如果封包的TTL变为0，或者路由器由于网络拥堵等原因封包队列满了，这个包就会被路由器丢弃