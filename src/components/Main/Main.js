import React, { useState } from 'react';
import { Card, Menu } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import HelloPage from '../HelloPage/HelloPage';
import CheckWebcam from '../CheckWebcam/CheckWebcam';
import CheckImage from '../CheckImage/CheckImage';

const Main = () => {
  const [noTitleKey, setnoTitleKey] = useState('1');
  const handleClick = (event) => {
    setnoTitleKey(event.key);
  };

  const contentList = {
    1: (
        <HelloPage />
    ),
    2: (
        <CheckWebcam />
    ),
    3: (
        <CheckImage />
    ),
  };
  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        onClick={handleClick}
        selectedKeys={noTitleKey}
      >
        <Menu.Item key="1">Main Page</Menu.Item>
        <Menu.Item key="2">Webcam</Menu.Item>
        <Menu.Item key="3">Photo</Menu.Item>
      </Menu>
      <Card>{contentList[noTitleKey]}</Card>
    </>
  );
};

export default Main;
