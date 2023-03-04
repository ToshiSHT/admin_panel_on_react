import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import React from 'react';
import {
    serializeDOMToString,
    parseStringToDom,
    wrappTextNodes,
    unWrappTextNode,
    wrapImages,
    unwrapImages,
} from '../../helpers/dom-helpers.js';
import { enableEditing } from '../../helpers/enableEditing.js';
import '../../helpers/iframeLoader.js';
import Spinner from '../spinner/Spinner.js';
import DevPanel from '../devPanel/DevPanel.js';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, message } from 'antd';
import { natification } from '../../helpers/natification.js';
import Login from '../login/Login.js';
import Modals from '../allModals/Modals/Modals.js';
import injectStyles from '../../helpers/injectStyles.js';
import { loadBackupList, loadPageList } from '../../helpers/loadsLists.js';

const Editor = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const { confirm } = Modal;
    const dispatch = useDispatch();

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
            .then(() =>
                enableEditing(
                    iframe.current,
                    virtualDom.current,
                    isLoading,
                    isLoaded,
                    messageApi
                )
            )
            .then(() => injectStyles(iframe.current))
            .then(isLoaded);

        loadBackupList(currentPage.current, dispatch);
    };
    const init = (e, page) => {
        if (e) {
            e.preventDefault();
            isLoading();
        }
        if (auth) {
            open(page, isLoaded);
            currentPage.current = page;
            loadPageList(dispatch);
            loadBackupList(currentPage.current, dispatch);
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
            .then(() => loadBackupList(currentPage.current, dispatch))
            .catch(() => natification('error', 'Ошибка сохранения', messageApi))
            .finally(isLoaded);
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
            <DevPanel />
            {spinner}
            {virtualDom.current ? (
                <Modals
                    onSave={onSave}
                    init={init}
                    restoreBackup={restoreBackup}
                    virtualDom={virtualDom.current}
                />
            ) : null}
        </>
    );
};

export default Editor;
