/*
 * @Description: 基于配置的表单组件
 * @Author: 吴锦辉
 * @Date: 2021-08-05 13:53:09
 * @LastEditTime: 2021-09-25 11:49:11
 */

import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Checkbox,
  Radio,
  DatePicker,
  Button,
  Breadcrumb,
} from 'antd';

const { Item } = Form;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function ConfigForm({
  configs,
  col = 1,
  gutter = { xs: 8, sm: 16, md: 24, lg: 32 },
  formProps = {},
  showBtn = true,
  okText = '确认',
  cancelText = '返回',
  resetText = '重置',
  showOkBtn = true,
  showCancelBtn = true,
  showResetBtn = false,
  btnFull = true,
  ok,
  cancel,
  reset,
  showBreadcrumb = false,
  breadcrumbConfigs = [],
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

      const { cmpType, wrapProps = {}, cmpProps = {}, cmp, tip } = v;

      let temp;

      switch (cmpType) {
        case 'input':
          temp = <Input allowClear {...cmpProps} />;
          break;
        case 'textarea':
          temp = <TextArea allowClear showCount maxLength={50} {...cmpProps} />;
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
          {tip}
        </Col>
      );
    });

    return list;
  }, [configs, form, col]);

  const { btnAlign, btnSpan } = useMemo(() => {
    let btnAlign;
    let btnSpan;

    if (btnFull) {
      btnAlign = 'center';
      btnSpan = 24;
    } else {
      let list = configs;

      if (typeof configs === 'function') {
        list = configs(form);
      }

      const diff = list.length % col;
      btnAlign = 'right';
      btnSpan = diff === 0 ? 24 : (24 / col) * (col - diff);
    }

    return {
      btnAlign,
      btnSpan,
    };
  }, [configs, form, col, btnFull]);

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

  const onReset = useCallback(() => {
    form.resetFields();

    reset && reset();
  }, [reset, form]);

  if (!configs) {
    return null;
  }

  return (
    <>
      {showBreadcrumb && breadcrumbConfigs.length > 0 ? (
        <div
          style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}
        >
          <Breadcrumb>
            {breadcrumbConfigs.map((v, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Breadcrumb.Item key={index}>
                {v.path ? <Link to={v.path}>{v.title}</Link> : v.title}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
      ) : null}
      <Form form={form} validateMessages={{ required: '${label}是必选字段' }} {...formProps}>
        <Row gutter={gutter}>
          {values}
          {showBtn ? (
            <Col span={btnSpan} style={{ textAlign: btnAlign }}>
              {showResetBtn ? (
                <Button style={{ marginRight: '16px' }} type="primary" onClick={onReset}>
                  {resetText}
                </Button>
              ) : null}
              {showCancelBtn ? (
                <Button style={{ marginRight: '16px' }} onClick={onCancel}>
                  {cancelText}
                </Button>
              ) : null}
              {showOkBtn ? (
                <Button type="primary" onClick={onSubmit}>
                  {okText}
                </Button>
              ) : null}
            </Col>
          ) : null}
        </Row>
      </Form>
    </>
  );
}
