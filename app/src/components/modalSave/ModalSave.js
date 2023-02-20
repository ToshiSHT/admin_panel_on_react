import React from 'react';
import { Button, Modal, message } from 'antd';
const ModalSave = ({ openModalSave, onSave, onToggleModalSave }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const onSaveModal = () => {
        onToggleModalSave();
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
        onSave(saveSuccess, saveError);
    };
    return (
        <>
            {contextHolder}
            <Modal
                open={openModalSave}
                title="Сохранение"
                onCancel={onToggleModalSave}
                footer={[
                    <Button key="back" onClick={onToggleModalSave}>
                        Назад
                    </Button>,
                    <Button key="submit" type="primary" onClick={onSaveModal}>
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
