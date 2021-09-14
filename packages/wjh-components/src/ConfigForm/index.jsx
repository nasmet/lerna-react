/*
 * @Description: 基于配置的表单组件
 * @Author: 吴锦辉
 * @Date: 2021-08-05 13:53:09
 * @LastEditTime: 2021-09-14 16:39:35
 */

import React, { useCallback, useMemo } from 'react';
import { Form, Row, Col, Input, Select, Checkbox, Radio, DatePicker, Button } from 'antd';

const { Item } = Form;
const { RangePicker } = DatePicker;

export default function ConfigForm({
  configs,
  col = 1,
  gutter = { xs: 8, sm: 16, md: 24, lg: 32 },
  formProps = {},
  showBtn = true,
  okText = '确认',
  cancelText = '取消',
  showOkBtn = true,
  showCancelBtn = true,
  ok,
  cancel,
}) {
  const [form] = Form.useForm();

  const values = useMemo(() => {
    let list = configs;

    if (typeof configs === 'function') {
      list = configs(form);
    }

    list = list.map((v, index) => {
      const { show = true } = v;

      if (!show) {
        return null;
      }

      const { cmpType, wrapProps = {}, cmpProps = {}, cmp } = v;

      let temp;

      switch (cmpType) {
        case 'input':
          temp = <Input allowClear {...cmpProps} />;
          break;
        case 'select':
          temp = <Select showSearch optionFilterProp="label" allowClear {...cmpProps} />;
          break;
        case 'checkbox':
          temp = <Checkbox.Group {...cmpProps} />;
          break;
        case 'radio':
          temp = <Radio.Group {...cmpProps} />;
          break;
        case 'datepicker':
          temp = <DatePicker allowClear {...cmpProps} />;
          break;
        case 'rangepicker':
          temp = <RangePicker allowClear {...cmpProps} />;
          break;
        case 'custom':
          temp = cmp;
          break;
        default:
          temp = null;
      }

      if (!temp) {
        return null;
      }

      const value = v.col || col;

      return (
        // eslint-disable-next-line react/no-array-index-key
        <Col key={index} span={24 / value}>
          <Item {...wrapProps}>{temp}</Item>
        </Col>
      );
    });

    return list;
  }, [configs, form, col]);

  const onSubmit = useCallback(() => {
    form
      .validateFields()
      .then(values => {
        ok && ok(values);
      })
      .catch(errorInfo => {
        console.log('errorInfo: ', errorInfo);
      });
  }, [form, ok]);

  const onCancel = useCallback(() => {
    cancel && cancel();
  }, [cancel]);

  if (!configs) {
    return null;
  }

  return (
    // eslint-disable-next-line no-template-curly-in-string
    <Form form={form} validateMessages={{ required: '${label}是必选字段' }} {...formProps}>
      <Row gutter={gutter}>
        {values}
        {showBtn ? (
          <Col span={24} style={{ textAlign: 'center' }}>
            {showOkBtn ? (
              <Button style={{ marginRight: '16px' }} type="primary" onClick={onSubmit}>
                {okText}
              </Button>
            ) : null}
            {showCancelBtn ? <Button onClick={onCancel}>{cancelText}</Button> : null}
          </Col>
        ) : null}
      </Row>
    </Form>
  );
}
