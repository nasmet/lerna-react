## 简介

分组路由渲染

## 使用说明

wjh-routers 是一个分组渲染组件，有两个参数

| 字段         | 是否必须 | 类型          | 描述                    |
| ------------ | -------- | ------------- | ----------------------- |
| routerConfig | 是       | Array<object> | 路由配置项              |
| loadingCmp   | 否       | ReactNode     | 使用懒加载组件的 loaing |

## 范例

npm i wjh-routers -S

```javascript
import RenderRouters from 'wjh-routers';

function App() {
  return (
    <BrowserRouter>
      <RenderRouters />
    </BrowserRouter>
  );
}
```
