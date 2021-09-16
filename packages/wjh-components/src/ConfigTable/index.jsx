import React, { useState, useCallback } from 'react';
import { Table, Pagination } from 'antd';

export default function ConfigTable({
  defaultPage = 1,
  defaultPageSize = 10,
  dataSource = [],
  total = 0,
  columns = [],
  showPagination = true,
  onPageChange,
  onPageSizeChange,
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
      <Table pagination={false} dataSource={dataSource} columns={columns} />
      {showPagination ? (
        <Pagination
          pageSize={pageSize}
          current={page}
          showQuickJumper
          defaultCurrent={defaultPage}
          total={total}
          onChange={onChange}
        />
      ) : null}
    </div>
  );
}
