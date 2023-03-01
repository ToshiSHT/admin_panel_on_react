import React from 'react';
import ConfirmModal from '../confirmModal/ConfirmModal.js';
import ChooseModal from '../chooseModal/ChooseModal';
import EditorMeta from '../../editorMeta/EditorMeta.js';
import { useSelector, useDispatch } from 'react-redux';
import {
    toggleModalSave,
    toggleModalChoose,
    toggleModalBackup,
    toggleModalLogout,
    toggleModalMeta,
} from '../../../store/slices/openModalSlice.js';

const Modals = ({ onSave, logOut, init, restoreBackup, virtualDom }) => {
    const dispatch = useDispatch();
    const modalsState = useSelector((state) => state.modals);
    const dataList = useSelector((state) => state.dataList);

    return (
        <>
            <ConfirmModal
                onConfirmFunc={onSave}
                openModal={modalsState.modalSave}
                onToggleModal={() => dispatch(toggleModalSave())}
                contentText={{
                    text: 'Сохранение',
                    descr: 'Вы уверены, что хотите сохранить изменения ?',
                    btnCofirm: 'Сохранить',
                }}
            />
            <ConfirmModal
                onConfirmFunc={logOut}
                openModal={modalsState.modalLogout}
                onToggleModal={() => dispatch(toggleModalLogout())}
                contentText={{
                    text: 'Выход',
                    descr: 'Вы уверены, что хотите сохранить выйти ? ',
                    btnCofirm: 'Выйти',
                }}
            />
            <ChooseModal
                openModal={modalsState.modalChoose}
                onToggleModal={() => dispatch(toggleModalChoose())}
                data={dataList.pageList}
                redirect={init}
                title="Выберите страницу для редактирования :"
            />
            <ChooseModal
                openModal={modalsState.modalBackup}
                onToggleModal={() => dispatch(toggleModalBackup())}
                data={dataList.backupList}
                redirect={restoreBackup}
                title="Выберите Backup для восстановления :"
            />
            <EditorMeta
                openModal={modalsState.modalMeta}
                onToggleModal={() => dispatch(toggleModalMeta())}
                virtualDom={virtualDom}
            />
        </>
    );
};

export default Modals;
