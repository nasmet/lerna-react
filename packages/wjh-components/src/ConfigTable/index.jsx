import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination, Breadcrumb } from 'antd';
import ConfigForm from '../ConfigForm';

export default function ConfigTable({
  children,
  defaultPage = 1,
  defaultPageSize = 10,
  dataSource = [],
  total = 0,
  columns = [],
  rowKey = 'id',
  loading = false,
  showPagination = true,
  showSearch = true,
  searchConfigs = [],
  showBreadcrumb = true,
  breadcrumbConfigs = [],
  onPageChange,
  onPageSizeChange,
  onSearch,
  onReset,
}) {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [page, setPage] = useState(defaultPage);

  const onChange = useCallback(
    (p, s) => {
      if (p !== page) {
        setPage(p);

        onPageChange && onPageChange(p);
      }

      if (s !== pageSize) {
        setPageSize(s);

        onPageSizeChange && onPageSizeChange(s);
      }
    },
    [pageSize, page, onPageChange, onPageSizeChange]
  );

  return (
    <div>
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
      {showSearch ? (
        <div style={{ borderBottom: '1px solid #eee' }}>
          <ConfigForm
            configs={searchConfigs}
            col={3}
            gutter={[32, 8]}
            showCancelBtn={false}
            showResetBtn
            btnFull={false}
            ok={onSearch}
            okText="搜索"
            reset={onReset}
          />
        </div>
      ) : null}
      {children}
      <div style={{ marginTop: '15px' }}>
        <Table
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          rowKey={rowKey}
          loading={loading}
        />
      </div>
      {showPagination ? (
        <div style={{ marginTop: '15px', textAlign: 'right' }}>
          <Pagination
            pageSize={pageSize}
            current={page}
            showQuickJumper
            defaultCurrent={defaultPage}
            total={total}
            onChange={onChange}
          />
        </div>
      ) : null}
    </div>
  );
}
