import React from 'react';
import { Pagination } from 'antd';

function Pag({ totalPages, changePagination, page }) {
  return (
    <Pagination
      defaultCurrent={page}
      total={totalPages}

      onChange={changePagination}
      defaultPageSize={1}
    />
  );
}
export default Pag;
