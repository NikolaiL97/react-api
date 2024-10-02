import React from 'react';
import { Flex, Rate } from 'antd';
import './rating.css'
const Rating = () => (
  <Flex gap="middle" vertical>
    <Flex gap="middle">
      <Rate className='rate'
       defaultValue={3}
      count={10} />
    </Flex>
  </Flex>
);
export default Rating;