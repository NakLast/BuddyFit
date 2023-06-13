import React from 'react';

import DetecSitUp from '../excercises/DetecSitUp'
import GameSitUp from '../games/GameSitUp'

import { Row, Col, Card } from 'antd'

class SitUp extends React.Component {
  render() {
    return (
      <>
        <Row>
            <Col xs={24} md={12} lg={14}>  
              <DetecSitUp />
            </Col>
            <Col xs={24} md={12} lg={10}>
              <GameSitUp /> 
            </Col>
        </Row>
      </>
    );
  }
}

export default SitUp;
