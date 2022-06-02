# 自定义时间跨度选择器

## 描述

基于react、antd封装的自定义时间跨度选择器组件，用户可以通过自定义设定时间范围快速选择日期或设置刷新频率使用组件。

## 效果

<img src="https://s2.loli.net/2022/02/08/eOnb4DXIu5YE126.png" width="320"/>
<img src="https://s2.loli.net/2022/02/08/CxD92z4mph8HBt6.png" width="720"/>

## 安装

```
npm i @dzc/quick-time-selection --save
```

## 使用

```jsx
import React from 'react';
import QuickTimeSelection from '@dzc/quick-time-selection';

export default () => {

  const timeProps = {
    trigger: "hover", // hover、click
    defaultTime: [], // [moment().subtract(1, 'years'), moment()]
    format: "YYYY-MM-DD HH:mm",
    showTime: { format: "HH:mm" }, // false
    showRefresh: true,
    outFormat: "", // 'YYYY-MM-DD HH:mm:ss'
    onChange: (value) => {
      console.warn("value", value);
    },
    refresh: () => {
      console.warn("页面/数据刷新...");
    }
  }

  return <QuickTimeSelection {...timeProps} />;
};

```

## API

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| trigger | 浮窗触发方式，包含移入显示和点击显示两种方式 | string | 'hover' | 'hover' &#124; 'click' |
| defaultTime | 设置默认时间 | array | [] | 如[moment().subtract(1, 'years'), moment()]等 |
| format | 设置时间格式 | string |' YYYY-MM-DD HH:mm' | - |
| showTime | 是否显示时分秒 | object &#124; boolean | { format: "HH:mm" } | { format: "HH:mm" } &#124; false |
| showRefresh | 是否显示刷新频率 | boolean | true | false |
| outFormat | 设置组件结果输出的时间格式 | string | '' | 'YYYY-MM-DD HH:mm:ss' |
| onChange | 监听时间值变化 | func | - | - |
| refresh | 监听刷新频率功能 | func | - | - |

## 更新日志

```
1.0.4 文档优化
1.0.3 文档优化
1.0.2 组件支持刷新控件显示隐藏、优化提示报错问题
1.0.1 组件语言汉化
1.0.0 组件发布
```

## 温馨提示

```
如需支持更多自定义效果，请联系作者逐步完善
开发者：诺克
微信：15858194070
```

## 鼓励和支持

开发不易，开源不易。如果这篇经验对您有所帮助，请多给我一些鼓励和支持，谢谢！。

<img src="https://i.loli.net/2021/11/12/IgrFyOTfE5AkWpu.jpg" width="300"/><img src="https://i.loli.net/2021/11/12/AMhSpxZX19d5CIq.jpg" width="300"/>
