import React from 'react';
import 'antd/dist/antd.css';
import { Col } from 'antd';

const HelloPage = () => {
    const hello = "hello";
    return (
        <>
            <Col>{hello}</Col>
        </>
    )
}

export default HelloPage;