# 滚动加载组件

## 描述

基于react、antd、react-infinite-scroller封装的滚动加载组件，用户可以通过配置请求路径、请求方式、响应字段等参数使用组件。

## 效果

<img src="https://i.loli.net/2021/11/17/tHxEPaSFpGw7mhQ.png" width="320"/><img src="https://i.loli.net/2021/11/17/QAy8BLY74U5uhDs.png" width="320"/>

## 安装

```
npm i @dzc/quick-time-selection --save
```

## 使用

```jsx
import React from 'react';
import QuickTimeSelection from '@dzc/quick-time-selection';

export default () => {

  const scrollLoadingProps = {
    title: '文本列表',
    showHeader: true,
    height: '600px',
    method: 'GET',
    url: '/api/marketing_planning/getOptionalMsgs',
    currentPageKey: 'start',
    params: {
      version: 1,
      offSet: 20,
      start: 0,
      id: '20'
    },
    reqCodeKey: 'code',
    reqCodeValue: '200',
    reqDataKey: 'data',
    reqListKey: 'msgs',
    reqTotalKey: 'total'
  }

  return <QuickTimeSelection {...scrollLoadingProps} />;
};

```

## API

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| title | 列表标题 | string | '文本列表' | - |
| showHeader | 是否显示列表头部 | boolean | true | - |
| height | 列表高度（包含头部） | string &#124; number | '100%' | - |
| method | 列表数据请求方式 | string | 'GET' | 'GET' &#124; 'POST' |
| url | 列表数据请求地址 | string | '' | - |
| currentPageKey | 列表滚动的起始页字段key | string | 'page' | - |
| params | 列表数据请求参数对象（一般包含请求条数、请求当前页等字段） | object | - | - |
| reqCodeKey | 列表请求返回的状态字段名（可参考下方数据格式） | string | 'code' | - |
| reqCodeValue | 列表请求返回的成功状态值（可参考下方数据格式） | string | '200' | - |
| reqDataKey | 列表请求返回的数据字段名（可参考下方数据格式） | string | 'data' | - |
| reqListKey | 列表请求返回的列表字段名（可参考下方数据格式） | string | 'msgs' | - |
| reqTotalKey | 列表请求返回的总数字段名（可参考下方数据格式） | string | 'total' | - |


## 更新日志

```
3.0.2 组件滚动条优化
3.0.1 组件样式优化
3.0.0 组件发布
```

## 数据格式

![demo.png](https://i.loli.net/2021/11/17/CEKRXPwjqshU973.png)
---
![demo.png](https://i.loli.net/2021/11/16/RFpnluXH1QTIAg7.png)

## 温馨提示

```
如需支持更多自定义效果，请联系作者逐步完善
开发者：诺克
微信：15858194070
```

## 鼓励和支持

开发不易，开源不易。如果这篇经验对您有所帮助，请多给我一些鼓励和支持，谢谢！。

<img src="https://i.loli.net/2021/11/12/IgrFyOTfE5AkWpu.jpg" width="300"/><img src="https://i.loli.net/2021/11/12/AMhSpxZX19d5CIq.jpg" width="300"/>
