import React from 'react';
import { Button, Space } from 'antd';
import {
    toggleModalSave,
    toggleModalChoose,
    toggleModalBackup,
    toggleModalLogout,
    toggleModalMeta,
} from '../../store/slices/openModalSlice.js';
import { useDispatch } from 'react-redux';
const DevPanel = () => {
    const dispatch = useDispatch();
    return (
        <div className="admin_panel">
            <div className="logo">ToshiSHT admin panel</div>
            <Space>
                <Button
                    type="primary"
                    onClick={() => dispatch(toggleModalMeta())}
                >
                    Редактировать meta
                </Button>
                <Button
                    type="primary"
                    onClick={() => dispatch(toggleModalBackup())}
                >
                    Востановить
                </Button>
                <Button
                    type="primary"
                    onClick={() => dispatch(toggleModalChoose())}
                >
                    Выбор страницы
                </Button>
                <Button
                    type="primary"
                    onClick={() => dispatch(toggleModalSave())}
                >
                    Сохранить
                </Button>
                <Button
                    type="default"
                    onClick={() => dispatch(toggleModalLogout())}
                >
                    Выход
                </Button>
            </Space>
        </div>
    );
};

export default DevPanel;
