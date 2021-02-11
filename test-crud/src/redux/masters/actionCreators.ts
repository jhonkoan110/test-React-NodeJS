import {
    ADD_MASTER,
    DELETE_MASTER,
    SET_MASTERS,
    START_EDIT_MASTER,
    MASTERS_ARE_LOADING,
    MASTERS_HAS_ERRORED,
    SAVE_UPDATED_MASTER,
    SET_CURRENT_MASTER,
} from './actionTypes';
import { IMaster } from './reducer';

export const setMasters = (masters: Array<IMaster>) => ({ type: SET_MASTERS, masters });

export const addMaster = (newMaster: IMaster) => ({ type: ADD_MASTER, newMaster });

export const deleteMaster = (id: number) => ({ type: DELETE_MASTER, id });

export const startEditMaster = (id: number) => ({ type: START_EDIT_MASTER, id });

export const mastersAreLoading = (bool: boolean) => ({ type: MASTERS_ARE_LOADING, bool });

export const mastersHasErrored = (bool: boolean) => ({ type: MASTERS_HAS_ERRORED, bool });

export const saveUpdatedMaster = (newMaster: IMaster) => ({ type: SAVE_UPDATED_MASTER, newMaster });

export const setCurrentMaster = (master: IMaster) => ({ type: SET_CURRENT_MASTER, master });
