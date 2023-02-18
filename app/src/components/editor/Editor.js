import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import {
    serializeDOMToString,
    parseStringToDom,
    wrappTextNodes,
    unWrappTextNode,
} from '../../helpers/dom-helpers.js';
import '../../helpers/iframeLoader.js';
import { textEdit } from '../../helpers/textEdit.js';
import { Button, message } from 'antd';
import ModalSave from '../modalSave/ModalSave.js';
import Spinner from '../spinner/Spinner.js';

const Editor = () => {
    const [currentPage, setCurrentPage] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const startPage = 'index.html';
    const virtualDom = useRef('');
    const iframe = useRef('');

    const isLoading = () => {
        setLoading(true);
    };
    const isLoaded = () => {
        setLoading(false);
    };

    useEffect(() => {
        init(startPage, isLoaded);
    }, []);

    const init = (page, isLoaded) => {
        setCurrentPage(page);

        axios
            .get(`../${page}`)
            .then((res) => parseStringToDom(res.data))
            .then(wrappTextNodes)
            .then((dom) => {
                virtualDom.current = dom;
                return dom;
            })
            .then(serializeDOMToString)
            .then((html) => axios.post('./api/saveTempPage.php', { html }))
            .then(() => iframe.current.load('../temp.html'))
            .then(() => enableEditing())
            .then(() => injectStyles())
            .then(isLoaded);
    };

    function save(success, error) {
        isLoading();
        console.log(virtualDom.current);
        const newDom = virtualDom.current.cloneNode(virtualDom.current);
        unWrappTextNode(newDom);
        const html = serializeDOMToString(newDom);
        axios
            .post('./api/savePage.php', { pageName: currentPage, html })
            .then(success)
            .catch(error)
            .finally(isLoaded);
        onOpenModal();
    }

    const enableEditing = () => {
        iframe.current.contentDocument.body
            .querySelectorAll('text-editor')
            .forEach((elem) => {
                const id = elem.getAttribute('nodeid');
                const virtualElem = virtualDom.current.body.querySelector(
                    `[nodeid="${id}"]`
                );
                textEdit(elem, virtualElem);
            });
    };

    const injectStyles = () => {
        const style = iframe.current.contentDocument.createElement('style');
        style.innerHTML = `
        text-editor:hover {
            outline: 4px solid #aed6dc;
            outline-offset: 6px;
        }
        text-editor:focus {
            outline: 4px solid #ff9a8d;
            outline-offset: 6px;
        }`;
        iframe.current.contentDocument.head.appendChild(style);
    };

    const onOpenModal = () => {
        setOpenModal((prev) => !prev);
    };
    let spinner = loading ? <Spinner active /> : <Spinner />;
    return (
        <>
            <div className="admin_panel">
                <div className="logo">ToshiSHT admin panel</div>
                <Button type="primary" onClick={onOpenModal}>
                    Сохранить
                </Button>
            </div>
            <iframe ref={iframe} frameBorder="0"></iframe>
            {spinner}
            <ModalSave
                openModal={openModal}
                closemodal={onOpenModal}
                save={save}
            />
        </>
    );
};

export default Editor;
