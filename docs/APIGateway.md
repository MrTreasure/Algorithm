> API Gateway is a type of service in a microservices architecture which provides a shared layer and API for clients to communicate with internal services. The API Gateway can route requests, transform protocols, aggregate data and implement shared logic like authentication and rate-limiters.

> API网关是一种在微服务架构中对外提供统一接口，队内进行内部服务调用的中间层。API网关可以分发路由、转换协议、收集数据、继承通用接口 比如认证、以及限流。

![API Gateway as an entry point to microservices](https://blog-assets.risingstack.com/2017/07/api-gateway-1.png)

## API网关能够实现的功能
1. 统一的认证
![Authentication](https://blog-assets.risingstack.com/2017/07/api-gateway-auth-1.png)
2. 整合、收集数据
![Data aggregation](https://blog-assets.risingstack.com/2017/07/api-gateway-aggregation-1.png)
3. 转换数据格式
![Serialization format transformation](https://blog-assets.risingstack.com/2017/07/api-gateway-format-2.png)
4. 转换协议
![Protocol transformation](https://blog-assets.risingstack.com/2017/07/api-gateway-protocol.png)
5. 流量限制以及缓存

## 吹逼角度
微服务，架构演化，组件协同，熔断，恢复
从数据供应链的角度讲讲