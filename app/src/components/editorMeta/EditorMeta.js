import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Input } from 'antd';
const EditorMeta = ({ openModal, onToggleModal, virtualDom }) => {
    const title = useRef('');
    const keywords = useRef('');
    const description = useRef('');

    const [metaTegs, setMetaTegs] = useState({
        title: '',
        keywords: '',
        description: '',
    });
    const { TextArea } = Input;
    const onSaveModal = () => {
        onToggleModal();
    };
    useEffect(() => {
        getMeta(virtualDom);
    }, [virtualDom]);
    const getMeta = (virtualDom) => {
        title.current =
            virtualDom.head.querySelector('title') ||
            virtualDom.head.appendChild(virtualDom.createElement('title'));

        keywords.current = virtualDom.head.querySelector(
            'meta[name="keywords"]'
        );
        if (!keywords.current) {
            keywords.current = virtualDom.head.appendChild(
                virtualDom.createElement('meta')
            );
            keywords.current.setAttribute('name', 'keywords');
        }
        description.current = virtualDom.head.querySelector(
            'meta[name="description"]'
        );
        if (!description.current) {
            description.current = virtualDom.head.appendChild(
                virtualDom.createElement('meta')
            );
            description.current.setAttribute('name', 'description');
        }
        setMetaTegs({
            title: title.current.innerHTML,
            description: description.current.getAttribute('content'),
            keywords: keywords.current.getAttribute('content'),
        });
    };

    const applyMeta = () => {
        title.current.innerHTML = metaTegs.title;
        description.current.setAttribute('content', metaTegs.description);
        keywords.current.setAttribute('content', metaTegs.keywords);
    };
    const onValueChange = (e) => {
        if (e.target.getAttribute('data-title')) {
            setMetaTegs((prev) => {
                return { ...prev, title: e.target.value };
            });
        } else if (e.target.getAttribute('data-key')) {
            setMetaTegs((prev) => {
                return { ...prev, keywords: e.target.value };
            });
        } else {
            setMetaTegs((prev) => {
                return { ...prev, description: e.target.value };
            });
        }
    };

    return (
        <>
            <Modal
                open={openModal}
                title="Редактирование Meta-тэгов"
                onCancel={onToggleModal}
                footer={[
                    <Button key="back" onClick={onToggleModal}>
                        Назад
                    </Button>,
                    <Button key="submit" type="primary" onClick={applyMeta}>
                        Сохранить
                    </Button>,
                ]}
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 500 }}
                >
                    <Form.Item label="Title">
                        <Input
                            data-title
                            placeholder="введите title"
                            rows={5}
                            value={metaTegs.title}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Item>
                    <Form.Item label="Keyword">
                        <TextArea
                            data-key
                            placeholder="введите Keyword"
                            rows={5}
                            value={metaTegs.keywords}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Item>

                    <Form.Item label="Description">
                        <TextArea
                            data-descr
                            placeholder="введите Description"
                            rows={5}
                            value={metaTegs.description}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditorMeta;
