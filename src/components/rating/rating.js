import React, { Component } from 'react';
import { Flex, Rate } from 'antd';
import './rating.css';

export default class Rating extends Component {
  render() {
    const { onChangeRate, rate } = this.props;

    return (
      <Flex gap="middle" vertical>
        <Flex gap="middle">
          <Rate
            className="rate"
            defaultValue={0}
            value={rate}
            count={10}
            allowHalf
            onChange={onChangeRate}
          />
        </Flex>
      </Flex>
    );
  }
}
