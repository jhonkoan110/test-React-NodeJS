import {
    SET_SPECIALISATIONS,
    IS_LOADING,
    HAS_ERRORED,
    START_EDIT,
    DELETE_SPECIALISATION,
    ADD_SPECIALISATION,
    SAVE_UPDATED_SPECIALISATION,
} from './actionTypes';
import { ISpecialisation } from './reducer';

export const setSpecialisations = (specialisations: Array<ISpecialisation>) => ({
    type: SET_SPECIALISATIONS,
    specialisations,
});

export const isLoading = (bool: boolean) => ({ type: IS_LOADING, bool });

export const hasErrored = (bool: boolean) => ({ type: HAS_ERRORED, bool });

export const startEdit = (id: number) => ({ type: START_EDIT, id });

export const deleteSpecialisations = (id: number) => ({ type: DELETE_SPECIALISATION, id });

export const addSpecialisation = (newSpec: ISpecialisation) => ({
    type: ADD_SPECIALISATION,
    newSpec,
});

export const saveUpdatedSpecialisation = (newSpec: ISpecialisation) => ({
    type: SAVE_UPDATED_SPECIALISATION,
    newSpec,
});
