import React from 'react';
import QuickTimeSelection from '../components/QuickTimeSelection';

export default () => {

  const timeProps = {
    trigger: "hover", // hover、click
    defaultTime: [], // [moment().subtract(1, 'years'), moment()]
    format: "YYYY-MM-DD HH:mm",
    showTime: { format: "HH:mm" }, // false
    showRefresh: false,
    outFormat: "", // 'YYYY-MM-DD HH:mm:ss'
    onChange: (value) => {
      console.warn("value", value);
    },
    refresh: () => {
      console.warn("页面/数据刷新...");
    },
  }

  return <QuickTimeSelection {...timeProps} />;
};
