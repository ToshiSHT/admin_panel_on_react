import React from 'react';
import { Button, Modal } from 'antd';
const ModalSave = ({ openModalSave, onSave, onToggleModalSave }) => {
    const onSaveModal = () => {
        onToggleModalSave();
        onSave();
    };
    return (
        <>
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
