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
import { Button, Space } from 'antd';
import ModalSave from '../modalSave/ModalSave.js';
import Spinner from '../spinner/Spinner.js';
import ChooseModal from '../chooseModal/ChooseModal.js';

const Editor = () => {
    const [currentPage, setCurrentPage] = useState('');
    const [pageList, setPageList] = useState([]);
    const [openModalSave, setOpenModalSave] = useState(false);
    const [openModalChoose, setOpenModalChoose] = useState(false);
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
        init(null, startPage, isLoaded);
    }, []);
    const open = (page, isLoaded) => {
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
            .then(() => iframe.current.load('../aadawqe324we1ras.html'))
            .then(() => axios.post('./api/deleteTempPage.php'))
            .then(() => enableEditing())
            .then(() => injectStyles())
            .then(isLoaded);
    };
    const init = (e, page) => {
        if (e) {
            e.preventDefault();
            isLoading();
        }
        open(page, isLoaded);
        setCurrentPage(page);

        loadPageList();
    };

    function onSave(success, error) {
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

    const loadPageList = () => {
        axios.get('./api/pageList.php').then((res) => setPageList(res.data));
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

    const onToggleModalSave = () => {
        setOpenModalSave((prev) => !prev);
    };
    const onToggleModalChoose = () => {
        setOpenModalChoose((prev) => !prev);
    };
    let spinner = loading ? <Spinner active /> : <Spinner />;
    return (
        <>
            <div className="admin_panel">
                <div className="logo">ToshiSHT admin panel</div>
                <Space>
                    <Button type="primary" onClick={onToggleModalChoose}>
                        Выбор страницы
                    </Button>
                    <Button type="primary" onClick={onToggleModalSave}>
                        Сохранить
                    </Button>
                </Space>
            </div>
            <iframe ref={iframe} frameBorder="0"></iframe>
            {spinner}
            <ModalSave
                onSave={onSave}
                openModalSave={openModalSave}
                onToggleModalSave={onToggleModalSave}
            />
            <ChooseModal
                openModalChoose={openModalChoose}
                onToggleModalChoose={onToggleModalChoose}
                data={pageList}
                redirect={init}
            />
        </>
    );
};

export default Editor;
