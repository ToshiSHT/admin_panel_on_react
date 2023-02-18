import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 55,
        }}
        spin
    />
);
const Spinner = ({ active }) => {
    const activeClass = active ? 'loading active' : 'loading';
    return (
        <div className={activeClass}>
            <Spin indicator={antIcon} />;
        </div>
    );
};

export default Spinner;
