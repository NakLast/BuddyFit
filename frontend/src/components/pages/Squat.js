import React from 'react';

import DetecSquat from '../excercises/DetecSquat'
import GameSquat from '../games/GameSquat'

import { Row, Col } from 'antd'

class Squat extends React.Component {
    render() {
        return (
            <>
                <Row>
                    <Col xs={24} md={12} lg={14}>
                        <DetecSquat />
                    </Col>
                    <Col xs={24} md={12} lg={10}>
                        <GameSquat />
                    </Col>
                </Row>
            </>
        );
    }
}

export default Squat;
