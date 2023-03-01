import { createSlice } from '@reduxjs/toolkit';

const openModalSlice = createSlice({
    name: 'modals',
    initialState: {
        modalSave: false,
        modalChoose: false,
        modalBackup: false,
        modalMeta: false,
        modalLogout: false,
    },
    reducers: {
        toggleModalSave(state) {
            state.modalSave = !state.modalSave;
        },
        toggleModalChoose(state) {
            state.modalChoose = !state.modalChoose;
        },
        toggleModalBackup(state) {
            state.modalBackup = !state.modalBackup;
        },
        toggleModalMeta(state) {
            state.modalMeta = !state.modalMeta;
        },
        toggleModalLogout(state) {
            state.modalLogout = !state.modalLogout;
        },
    },
});

const { reducer, actions } = openModalSlice;
export const {
    toggleModalSave,
    toggleModalChoose,
    toggleModalBackup,
    toggleModalMeta,
    toggleModalLogout,
} = actions;

export default reducer;
