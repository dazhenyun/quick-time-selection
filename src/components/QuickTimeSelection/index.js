import React, { useEffect, useState, useRef } from "react";
import { Button, Popover, InputNumber, DatePicker, Empty, Select, ConfigProvider } from "antd";
import PropTypes from "prop-types";
import moment from "moment";
import { DownOutlined, CalendarOutlined } from "@ant-design/icons";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import "antd/dist/antd.css";
import "./index.less";

const { Option } = Select;
const { RangePicker } = DatePicker;
const getCommonDate = () => JSON.parse(localStorage.getItem('dateCommonList') || '[]')
const dateCommonList = getCommonDate();
let timer = null

const Page = (props) => {
  const {
    trigger = "hover", // hover、click
    defaultTime = [], // [moment().subtract(1, 'years'), moment()]
    format = "YYYY-MM-DD HH:mm",
    showTime = { format: "HH:mm" }, // false
    outFormat = "", // 'YYYY-MM-DD HH:mm:ss'
    onChange = (value) => {
      console.warn("value", value);
    },
    refresh = () => {
      console.warn("页面/数据刷新...");
    },
  } = props;

  const firstUpdate = useRef(true);
  const [lastNext, setLastNext] = useState();
  const [refreshCount, setRefreshCount] = useState();
  const [refreshUnit, setRefreshUnit] = useState();
  const [lastNextUnit, setLastNextUnit] = useState();
  const [lastNextValue, setLastNextValue] = useState();
  const [refreshOpen, setRefreshOpen] = useState();
  const [time, setTime] = useState(defaultTime);

  const unitList = [
    { label: "秒", value: "seconds" },
    { label: "分钟", value: "minutes" },
    { label: "小时", value: "hours" },
    { label: "天", value: "days" },
    { label: "周", value: "weeks" },
    { label: "月", value: "months" },
    { label: "年", value: "years" },
  ];

  const dateList = [
    {
      label: "今天",
      value: "0",
      time: [moment().startOf("day"), moment().endOf("day")],
    },
    {
      label: "最近24小时",
      value: "1",
      time: [moment().subtract(24, "hours"), moment()],
    },
    {
      label: "本周",
      value: "2",
      time: [moment().startOf("weeks"), moment().endOf("weeks")],
    },
    {
      label: "最近7天",
      value: "3",
      time: [moment().subtract(7, "days"), moment()],
    },
    {
      label: "最近15分钟",
      value: "4",
      time: [moment().subtract(15, "minutes"), moment()],
    },
    {
      label: "最近1小时",
      value: "5",
      time: [moment().subtract(1, "hours"), moment()],
    },
    {
      label: "最近1年",
      value: "6",
      time: [moment().subtract(1, "years"), moment()],
    },
  ];

  const refreshUnitList = [
    { label: "秒", value: "seconds", time: 1000 },
    { label: "分钟", value: "minutes", time: 1000 * 60 },
    { label: "小时", value: "hours", time: 1000 * 60 * 60 },
  ];

  const handleDateList = (item) => {
    setTime(item.time);
    const c = getCommonDate()
    if (!c.length || c.findIndex(v => item.value === v.value) < 0) {
      c.push({
        value: item.value,
        label: item.label
      })
      localStorage.setItem('dateCommonList', JSON.stringify(c))
    }
  };

  const handleTimeRefresh = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (refreshOpen) {
      setRefreshOpen(!refreshOpen);
      return;
    }
    if (refreshUnit && refreshCount) {
      const t =
        refreshUnitList.find((item) => item.value === refreshUnit).time *
        (refreshCount - 0);
      timer = setInterval(() => {
        refresh();
      }, t);
      setRefreshOpen(!refreshOpen);
    }
    if (!refreshCount) {
      message.error("请设置刷新次数");
      return;
    }
    if (!refreshUnit) {
      message.error("请设置刷新频率单位");
    }
  };

  const handleDate = () => {
    if (lastNext && lastNextValue && lastNextUnit) {
      let fromVal = null;
      let toVal = null;
      if (lastNext === "Last") {
        fromVal = moment().subtract(lastNextValue - 0, lastNextUnit);
        toVal = moment();
      }
      if (lastNext === "Next") {
        fromVal = moment();
        toVal = moment().add(lastNextValue - 0, lastNextUnit);
      }
      setTime([fromVal, toVal]);
    }
    if (!lastNext) {
      message.error("请设置时间跨度");
      return;
    }
    if (!lastNextValue) {
      message.error("请设置时间值");
      return;
    }
    if (!lastNextUnit) {
      message.error("请选择时间单位");
    }
  };

  const handleDc = (item) => {
    const row = dateList.find(v => v.value === item.value)
    setTime(row.time)
  }

  const dateContent = () => (
    <div className="date-content-body">
      <p className="date-con-title">快速选择</p>
      <div className="date-con-box">
        <Select placeholder="请选择" value={lastNext} onChange={setLastNext}>
          <Option value="Last">最近</Option>
          <Option value="Next">未来</Option>
        </Select>
        <InputNumber
          placeholder="请输入"
          min={0}
          value={lastNextValue}
          onChange={setLastNextValue}
        />
        <Select
          placeholder="请选择"
          value={lastNextUnit}
          onChange={setLastNextUnit}
        >
          {unitList.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Button onClick={handleDate}>应用</Button>
      </div>
      <p className="date-con-title">常用</p>
      <div className="common-date-box">
        {dateList.map((item) => (
          <div key={item.value} className="date-box-item">
            <span onClick={() => handleDateList(item)}>{item.label}</span>
          </div>
        ))}
      </div>
      <p className="date-con-title">刷新频率</p>
      <div className="date-con-box">
        <InputNumber
          placeholder="请输入"
          min={0}
          value={refreshCount}
          onChange={setRefreshCount}
        />
        <Select
          placeholder="请选择"
          value={refreshUnit}
          onChange={setRefreshUnit}
        >
          {refreshUnitList.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Button onClick={handleTimeRefresh}>
          {refreshOpen ? "关闭" : "打开"}
        </Button>
      </div>
      <p className="date-con-title">最近使用的日期范围</p>
      {dateCommonList.length ? (
        <div className="common-date-box">
          {dateCommonList.map((item) => (
            <div key={item.value} className="date-box-item date-item-row">
              <span onClick={() => handleDc(item)}>{item.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    let res = time;
    if (outFormat) {
      res = time.map((item) => moment(item).format(outFormat));
    }
    onChange(res);
  }, [time]);

  return (
    <div className="quick-time-selection">
      <Popover trigger={trigger} placement="bottom" content={dateContent}>
        <span className="date-img">
          <CalendarOutlined className="date-icon" />
          <DownOutlined className="xiala" />
        </span>
      </Popover>
      <ConfigProvider locale={zh_CN}>
        <RangePicker
          className="priview-search"
          format={format}
          showTime={showTime}
          value={time}
          onChange={setTime}
        />
      </ConfigProvider>
    </div>
  );
};

Page.propTypes = {
  defaultTime: PropTypes.array,
  format: PropTypes.string,
  trigger: PropTypes.string,
  onChange: PropTypes.func,
  refresh: PropTypes.func,
  outFormat: PropTypes.string,
  showTime: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default Page;
