import React, { useEffect } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Modal, List, ConfigProvider } from 'antd';
const ChooseModal = ({ openModal, onToggleModal, data, redirect, title }) => {
    const redirectAndClose = (e, item) => {
        redirect(e, item);
        onToggleModal();
    };
    useEffect(() => {}, [data]);

    const renderPagelist = (item) => {
        if (item.time) {
            return (
                <List.Item>
                    <a href="#" onClick={(e) => redirectAndClose(e, item.file)}>
                        Резервная копия страницы {item.page} от: {item.time}
                    </a>
                </List.Item>
            );
        } else {
            return (
                <List.Item>
                    <a href="#" onClick={(e) => redirectAndClose(e, item)}>
                        {item}
                    </a>
                </List.Item>
            );
        }
    };

    const customize = () => (
        <div style={{ textAlign: 'center' }}>
            <SmileOutlined style={{ fontSize: 35 }} />
            <p>Данные не найдены!</p>
        </div>
    );

    return (
        <>
            <ConfigProvider renderEmpty={customize}>
                <Modal
                    open={openModal}
                    title={title}
                    onCancel={onToggleModal}
                    footer={[
                        <Button key="back" onClick={onToggleModal}>
                            Назад
                        </Button>,
                    ]}
                >
                    <List
                        bordered
                        dataSource={data}
                        renderItem={(item) => renderPagelist(item)}
                    />
                </Modal>
            </ConfigProvider>
        </>
    );
};

export default ChooseModal;
