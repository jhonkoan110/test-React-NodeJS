import {
    SPECIALISATION_ERROR,
    SPECIALISATION_ITEM_FETCHED,
    SPECIALISATION_ITEM_FETCHED_ERR,
    SPECIALISATION_ITEM_FETCHING,
    SPECIALISATION_LIST_FETCHED,
    SPECIALISATION_LIST_FETCHED_ERR,
    SPECIALISATION_LIST_FETCHING,
} from './actionTypes';

export interface ISpecialisation {
    id: number;
    name: string;
}

export interface ISpecError {
    name: string;
}

interface IInitialState {
    currentSpecialisation: null | ISpecialisation;
    specialisations: Array<ISpecialisation>;
    isListLoading: boolean;
    isItemLoading: boolean;
    listError: null | string;
    itemError: null | string;
    error: null | ISpecError;
}

const initialState: IInitialState = {
    currentSpecialisation: null,
    specialisations: [] as Array<ISpecialisation>,
    isListLoading: false,
    isItemLoading: false,
    listError: null,
    itemError: null,
    error: null,
};

const specialisationsReducer = (state: IInitialState = initialState, action: any) => {
    switch (action.type) {
        // ===================== List =====================
        case SPECIALISATION_LIST_FETCHING: {
            return { ...state, isListLoading: action.isListLoading };
        }

        case SPECIALISATION_LIST_FETCHED: {
            return { ...state, specialisations: action.specialisations };
        }

        case SPECIALISATION_LIST_FETCHED_ERR: {
            return { ...state, listError: action.error };
        }

        // ===================== Item =====================
        case SPECIALISATION_ITEM_FETCHING: {
            return { ...state, isItemLoading: action.isItemLoading };
        }

        case SPECIALISATION_ITEM_FETCHED: {
            return { ...state, currentSpecialisation: action.specialisation };
        }

        case SPECIALISATION_ITEM_FETCHED_ERR: {
            return { ...state, itemError: action.error };
        }

        // ===================== Error =====================
        case SPECIALISATION_ERROR: {
            return { ...state, error: action.error };
        }

        default:
            return state;
    }
};

export default specialisationsReducer;
