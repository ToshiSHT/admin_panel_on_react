import { createSlice } from '@reduxjs/toolkit';

const dataListSlice = createSlice({
    name: 'dataList',
    initialState: {
        pageList: [],
        backupList: [],
    },
    reducers: {
        setPageList(state, action) {
            state.pageList = action.payload;
        },
        setBackupList(state, action) {
            state.backupList = action.payload;
        },
    },
});

const { reducer, actions } = dataListSlice;
export const { setPageList, setBackupList } = actions;

export default reducer;
