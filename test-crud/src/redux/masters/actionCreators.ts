import { ADD_MASTER, DELETE_MASTER, SET_MASTERS, START_EDIT_MASTER } from './actionTypes';
import { IMaster } from './reducer';

export const setMasters = (masters: Array<IMaster>) => ({ type: SET_MASTERS, masters });

export const addMaster = (newMaster: IMaster) => ({ type: ADD_MASTER, newMaster });

export const deleteMaster = (id: number) => ({ type: DELETE_MASTER, id });

export const startEditMaster = (id: number) => ({ type: START_EDIT_MASTER, id });
