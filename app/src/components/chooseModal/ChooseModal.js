import React from 'react';
import { Button, Modal, List } from 'antd';
const ChooseModal = ({
    openModalChoose,
    onToggleModalChoose,
    data,
    redirect,
}) => {
    const redirectAndClose = (e, item) => {
        redirect(e, item);
        onToggleModalChoose();
    };
    return (
        <>
            <Modal
                open={openModalChoose}
                title="Выберите страницу для редактирования :"
                onCancel={onToggleModalChoose}
                footer={[
                    <Button key="back" onClick={onToggleModalChoose}>
                        Назад
                    </Button>,
                ]}
            >
                <List
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <a
                                href="#"
                                onClick={(e) => redirectAndClose(e, item)}
                            >
                                {item}
                            </a>
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
};

export default ChooseModal;
