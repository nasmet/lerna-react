/*
 * @Description: 日期联动组件
 * @Author: 吴锦辉
 * @Date: 2021-08-05 13:53:09
 * @LastEditTime: 2021-08-10 15:04:13
 */
import { Form, DatePicker, Row, Col } from 'antd';

import React, { useState, useCallback } from 'react';
import moment from 'moment';

export default function LinkageDatePicker(props) {
  const {
    children,
    form,
    startDateProps = {},
    endDateProps = {},
    handleStartDateDisabled = (current, endTime) => {
      if (!endTime) {
        return false;
      }

      return current > endTime || current < moment(endTime.valueOf()).subtract(1, 'month');
    },
    handleEndDateDisabled = (current, startTime) => {
      if (!startTime) {
        return false;
      }

      return current < startTime || current > moment(startTime.valueOf()).add(1, 'month');
    },
  } = props;
  const { setFieldsValue, getFieldValue, getFieldsValue } = form || {};

  const [startDateChange, setStartDateChange] = useState(false);
  const [endDateChange, setEndDateChange] = useState(false);

  const disabledDateOfStart = useCallback(
    current => {
      const endTime = getFieldValue('endTime');

      return handleStartDateDisabled(current, endTime);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endDateChange, getFieldValue, handleStartDateDisabled]
  );

  const disabledDateOfEnd = useCallback(
    current => {
      const startTime = getFieldValue('startTime');

      return handleEndDateDisabled(current, startTime);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startDateChange, getFieldValue, handleEndDateDisabled]
  );

  const onHandleLinkage = useCallback(() => {
    const { endTime, startTime } = getFieldsValue();

    if (!endTime || !startTime) {
      return;
    }

    if (endTime < startTime) {
      setFieldsValue({ endTime: null });
    }
  }, [setFieldsValue, getFieldsValue]);

  const onStartDateChange = useCallback(() => {
    /** 刷新开始的禁用的日期 */
    setEndDateChange(pre => !pre);
  }, []);

  const onEndDateChange = useCallback(() => {
    /** 刷新结束的禁用的日期 */
    setStartDateChange(pre => !pre);
  }, []);

  if (!form) {
    return <div>form对象没有传入进来</div>;
  }

  return (
    <Form.Item label="开始时间" required>
      <Row>
        <Col span={10}>
          <Form.Item
            name="startTime"
            rules={[
              {
                required: true,
                message: '必填',
              },
            ]}
          >
            <DatePicker
              showTime={{
                format: 'HH:mm',
                defaultValue: moment('00:00:00', 'HH:mm:ss'),
              }}
              format="YYYY-MM-DD HH:mm"
              placeholder="请选择开始时间"
              disabledDate={disabledDateOfStart}
              onChange={onStartDateChange}
              onBlur={onHandleLinkage}
              {...startDateProps}
            />
          </Form.Item>
        </Col>
        <Col span={1} style={{ textAlign: 'center' }}>
          <span>~</span>
        </Col>
        <Col span={10}>
          <Form.Item
            name="endTime"
            rules={[
              {
                required: true,
                message: '必填',
              },
            ]}
          >
            <DatePicker
              showTime={{
                format: 'HH:mm',
                defaultValue: moment('23:59:59', 'HH:mm:ss'),
              }}
              format="YYYY-MM-DD HH:mm"
              placeholder="请选择结束时间"
              disabledDate={disabledDateOfEnd}
              onChange={onEndDateChange}
              onBlur={onHandleLinkage}
              {...endDateProps}
            />
          </Form.Item>
        </Col>
      </Row>
      {children || null}
    </Form.Item>
  );
}
