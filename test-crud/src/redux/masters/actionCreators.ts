import { ADD_MASTER, DELETE_MASTER, SET_MASTERS } from './actionTypes';
import { IMaster } from './reducer';

export const setMasters = (masters: Array<IMaster>) => ({ type: SET_MASTERS, masters });

export const addMaster = (newMaster: IMaster) => ({ type: ADD_MASTER, newMaster });

export const deleteMaster = (id: number) => ({ type: DELETE_MASTER, id });
