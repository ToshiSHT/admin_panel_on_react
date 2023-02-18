import React from 'react';
import { Button, Modal, message } from 'antd';
const ModalSave = ({ openModal, save, closemodal }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const onSave = () => {
        const saveSuccess = () => {
            messageApi.open({
                type: 'success',
                content: 'Изменения успешно сохранены!',
                duration: 3,
            });
        };
        const saveError = () => {
            messageApi.open({
                type: 'error',
                content: 'Изменения не сохранены',
                duration: 3,
            });
            console.log(asdsad);
        };
        save(saveSuccess, saveError);
    };
    return (
        <>
            {contextHolder}
            <Modal
                open={openModal}
                title="Сохранение"
                onCancel={closemodal}
                footer={[
                    <Button key="back" onClick={closemodal}>
                        Назад
                    </Button>,
                    <Button key="submit" type="primary" onClick={onSave}>
                        Сохранить
                    </Button>,
                ]}
            >
                <p>Вы уверены, что хотите сохранить изменения ?</p>
            </Modal>
        </>
    );
};

export default ModalSave;
