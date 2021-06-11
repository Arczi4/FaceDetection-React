import { React } from 'react';
import 'antd/dist/antd.css';
import { Col, Layout, Tag } from 'antd';

const { Content } = Layout;
const Header = () => (
    <Layout className="layout">
        <Content style={{ padding: '0 50px' }} >
            <Col type="flex">
                <div>Witaj w mojej kuchni</div>
            </Col>
        </Content>
    </Layout>
)
export default Header;