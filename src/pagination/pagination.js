import React from 'react';
import { Pagination } from 'antd';
const Pag = ({totalPages}) => <Pagination
 defaultCurrent={1}
  total={totalPages}
  onChange={(e) => console.log(e)}
  defaultPageSize={1}
  />;
export default Pag;