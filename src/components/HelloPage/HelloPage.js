import React from 'react';
// import 'antd/dist/antd.css';
import { Col, Row, Typography, Image } from 'antd';
import img from './test.jpg'
import styles from './HelloPage.module.css';
import Person1 from './Person1.jpg';
import Person2 from './Person2.png';

const {Title}=Typography;
const HelloPage = () => {
    return (
        <div className={styles.HelloPage}>
            <Row>
                <Col offset={8} span={15} style={{marginTop: '160px'}}>
                    <Title className={styles.Font}>Aplikacja do wykrywania twarzy</Title>      
                </Col>
            </Row>
            <Row>
                <Col span={15} offset={10}>
                    <Title>
                        Wykonawcy:
                    </Title>
                </Col>
            </Row>
            <Row>
                <Col offset={5} > 
                    <Title level={3}>
                        Łukasz Gancarz
                    </Title>
                    <Image src={Person1}/>
                </Col>
                <Col offset={6} >
                    <Title level={3}>
                        Artur Urzędowski
                    </Title>
                    <Image src={Person2} />
                </Col>
            </Row>
        </div>
    )
}

export default HelloPage;