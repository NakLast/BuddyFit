import React from 'react';

import DetecPushUp from '../excercises/DetecPushUp'
import GamePushUp from '../games/GamePushUp'

import { Row, Col } from 'antd'

class PushUp extends React.Component {
  render() {
    return (
      <>
        <Row>
          <Col xs={24} md={12} lg={14}>
            <DetecPushUp />
          </Col>
          <Col xs={24} md={12} lg={10}>
            <GamePushUp />
          </Col>
        </Row>
      </>
    );
  }
}

export default PushUp;
