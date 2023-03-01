import React from 'react';
import { Button, Modal } from 'antd';
const ModalSave = ({
    openModal,
    onConfirmFunc,
    onToggleModal,
    contentText,
}) => {
    const onConfirmModal = () => {
        onToggleModal();
        onConfirmFunc();
    };
    return (
        <>
            <Modal
                open={openModal}
                title={contentText.title}
                onCancel={onToggleModal}
                footer={[
                    <Button key="back" onClick={onToggleModal}>
                        Назад
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={onConfirmModal}
                    >
                        {contentText.btnCofirm}
                    </Button>,
                ]}
            >
                <p>{contentText.descr}</p>
            </Modal>
        </>
    );
};

export default ModalSave;
