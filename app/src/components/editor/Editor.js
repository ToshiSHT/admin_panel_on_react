import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import {
    serializeDOMToString,
    parseStringToDom,
    wrappTextNodes,
    unWrappTextNode,
    wrapImages,
    unwrapImages,
} from '../../helpers/dom-helpers.js';
import '../../helpers/iframeLoader.js';
import { textEdit } from '../../helpers/textEdit.js';
import ModalSave from '../modalSave/ModalSave.js';
import Spinner from '../spinner/Spinner.js';
import ChooseModal from '../chooseModal/ChooseModal.js';
import DevPanel from '../devPanel/DevPanel.js';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, message } from 'antd';
import EditorMeta from '../editorMeta/EditorMeta.js';
import { editorImage } from '../../helpers/editorImage.js';
import { natification } from '../../helpers/natification.js';
import Login from '../login/Login.js';

const Editor = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [pageList, setPageList] = useState([]);
    const [backupList, setBackupList] = useState([]);
    const [openModalSave, setOpenModalSave] = useState(false);
    const [openModalChoose, setOpenModalChoose] = useState(false);
    const [openModalBackup, setOpenModalBackup] = useState(false);
    const [openModalMeta, setOpenModalMeta] = useState(false);
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const { confirm } = Modal;

    const currentPage = useRef('index.html');
    const virtualDom = useRef('');
    const iframe = useRef('');

    const isLoading = () => {
        setLoading(true);
    };
    const isLoaded = () => {
        setLoading(false);
    };
    const checkedAuth = () => {
        axios.get('./api/checkAuth.php').then((res) => {
            console.log(res.data);
            setAuth(res.data.auth);
        });
    };

    useEffect(() => {
        checkedAuth();
    }, []);

    useEffect(() => {
        init(null, currentPage.current, isLoaded);
    }, [auth]);
    const open = (page, isLoaded) => {
        axios
            .get(`../${page}?rnd=${Math.random()}`)
            .then((res) => parseStringToDom(res.data))
            .then(wrappTextNodes)
            .then(wrapImages)
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

        loadBackupList();
    };
    const init = (e, page) => {
        if (e) {
            e.preventDefault();
            isLoading();
        }
        if (auth) {
            open(page, isLoaded);
            currentPage.current = page;
            loadPageList();
            loadBackupList();
        }
    };

    const restoreBackup = (e, backup) => {
        if (e) {
            e.preventDefault();
        }
        confirm({
            title: 'Вы точно хотите восстановить резервную копию?',
            icon: <ExclamationCircleFilled />,
            content: 'Все не сохраненные данные будут потеряны!',
            okText: 'Восстановить',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk() {
                isLoading();
                axios
                    .post('./api/restoreBackup.php', {
                        page: currentPage.current,
                        file: backup,
                    })
                    .then(open(currentPage.current, isLoaded));
            },
        });
    };

    const onSave = async () => {
        isLoading();
        const newDom = virtualDom.current.cloneNode(virtualDom.current);
        unWrappTextNode(newDom);
        unwrapImages(newDom);
        const html = serializeDOMToString(newDom);
        await axios
            .post('./api/savePage.php', { pageName: currentPage.current, html })
            .then(() =>
                natification('success', 'Успешно сохранено!', messageApi)
            )
            .then(loadBackupList)
            .catch(() => natification('error', 'Ошибка сохранения', messageApi))
            .finally(isLoaded);
    };

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
        iframe.current.contentDocument.body
            .querySelectorAll('[editimgid]')
            .forEach((elem) => {
                const id = elem.getAttribute('editimgid');
                const virtualElem = virtualDom.current.body.querySelector(
                    `[editimgid="${id}"]`
                );
                editorImage(elem, virtualElem, isLoading, isLoaded, messageApi);
            });
    };

    const loadPageList = () => {
        axios.get('./api/pageList.php').then((res) => setPageList(res.data));
    };
    const loadBackupList = () => {
        axios
            .get('./backups/backups.json')
            .then((res) =>
                setBackupList(
                    res.data.filter(
                        (backup) => backup.page === currentPage.current
                    )
                )
            );
    };

    const injectStyles = () => {
        const style = iframe.current.contentDocument.createElement('style');
        style.innerHTML = `
        text-editor:hover {
            overflow-y: visible;
            outline: 4px solid #aed6dc;
            outline-offset: 6px;
        }
        text-editor:focus {
            overflow-y: visible;
            outline: 4px solid #ff9a8d;
            outline-offset: 6px;
        }
        [editimgid]:hover {
             outline: 4px solid #aed6dc;
            outline-offset: 6px;
        }
        `;
        iframe.current.contentDocument.head.appendChild(style);
    };

    const onToggleModalSave = () => {
        setOpenModalSave((prev) => !prev);
    };
    const onToggleModalChoose = () => {
        setOpenModalChoose((prev) => !prev);
    };
    const onToggleModalBackup = () => {
        setOpenModalBackup((prev) => !prev);
    };
    const onToggleModalMeta = () => {
        setOpenModalMeta((prev) => !prev);
    };
    let spinner = loading ? <Spinner active /> : <Spinner />;
    if (!auth) {
        return <Login setAuth={setAuth} />;
    }

    return (
        <>
            {contextHolder}
            <iframe ref={iframe} frameBorder="0"></iframe>
            <input
                id="img-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
            ></input>
            <DevPanel
                onToggleModalSave={onToggleModalSave}
                onToggleModalChoose={onToggleModalChoose}
                onToggleModalBackup={onToggleModalBackup}
                onToggleModalMeta={onToggleModalMeta}
            />
            {spinner}
            <ModalSave
                onSave={onSave}
                openModalSave={openModalSave}
                onToggleModalSave={onToggleModalSave}
            />
            <ChooseModal
                openModal={openModalChoose}
                onToggleModal={onToggleModalChoose}
                data={pageList}
                redirect={init}
                title="Выберите страницу для редактирования :"
            />
            <ChooseModal
                openModal={openModalBackup}
                onToggleModal={onToggleModalBackup}
                data={backupList}
                redirect={restoreBackup}
                title="Выберите Backup для восстановления :"
            />
            {virtualDom.current ? (
                <EditorMeta
                    openModal={openModalMeta}
                    onToggleModal={onToggleModalMeta}
                    virtualDom={virtualDom.current}
                />
            ) : null}
        </>
    );
};

export default Editor;
