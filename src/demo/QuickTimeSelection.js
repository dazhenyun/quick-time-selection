import React from 'react';
import QuickTimeSelection from '../components/QuickTimeSelection';

export default () => {

  const timeProps = {
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

  return <QuickTimeSelection {...timeProps} />;
};
