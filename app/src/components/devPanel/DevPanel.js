import React from 'react';
import { Button, Space } from 'antd';
const DevPanel = ({
    onToggleModalChoose,
    onToggleModalSave,
    onToggleModalBackup,
    onToggleModalMeta,
}) => {
    return (
        <div className="admin_panel">
            <div className="logo">ToshiSHT admin panel</div>
            <Space>
                <Button type="primary" onClick={onToggleModalMeta}>
                    Редактировать meta
                </Button>
                <Button type="primary" onClick={onToggleModalBackup}>
                    Востановить
                </Button>
                <Button type="primary" onClick={onToggleModalChoose}>
                    Выбор страницы
                </Button>
                <Button type="primary" onClick={onToggleModalSave}>
                    Сохранить
                </Button>
            </Space>
        </div>
    );
};

export default DevPanel;
