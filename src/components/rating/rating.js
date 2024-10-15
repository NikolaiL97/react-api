import React, { Component } from 'react';
import { Flex, Rate } from 'antd';
import './rating.css'

export default class Rating extends Component {

  render() {
    const onChangeRate = this.props.onChangeRate
    return (
    <Flex gap="middle" vertical>
      <Flex gap="middle">
        <Rate className='rate'
          defaultValue={0}
          count={10}
          allowHalf={true}
          onChange={onChangeRate}
        />
      </Flex>
    </Flex>
    )
  }

}
