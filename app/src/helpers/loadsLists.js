import axios from 'axios';
import { setPageList, setBackupList } from '../store/slices/dataListSlice.js';

export const loadPageList = (dispatch) => {
    axios
        .get('./api/pageList.php')
        .then((res) => dispatch(setPageList(res.data)));
};
export const loadBackupList = (currentPage, dispatch) => {
    axios
        .get('./backups/backups.json')
        .then((res) =>
            dispatch(
                setBackupList(
                    res.data.filter((backup) => backup.page === currentPage)
                )
            )
        );
};
