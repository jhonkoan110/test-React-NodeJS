import {
    MASTER_ITEM_FETCHED,
    MASTER_ITEM_FETCHED_ERR,
    MASTER_ITEM_FETCHING,
    MASTER_LIST_FETCHED,
    MASTER_LIST_FETCHED_ERR,
    MASTER_LIST_FETCHING,
    SET_MASTER_ERROR,
} from './actionTypes';

export interface IMaster {
    id: number;
    login: string;
    firstname: string;
    lastname: string;
    middlename: string;
    specialisation_id: number;
    name: string;
}

export interface IMasterError {
    login: string;
    firstname: string;
    lastname: string;
    middlename: string;
    specialisation: string;
}

interface IInitialState {
    masters: Array<IMaster>;
    currentMaster: null | IMaster;
    isListLoading: boolean;
    isItemLoading: boolean;
    listError: null | string;
    itemError: null | string;
    error: null | IMasterError;
}

const initialState: IInitialState = {
    masters: [] as Array<IMaster>,
    currentMaster: null,
    isListLoading: false,
    isItemLoading: false,
    listError: null,
    itemError: null,
    error: null,
};

const mastersReducer = (state: IInitialState = initialState, action: any) => {
    switch (action.type) {
        // =================== Master List ===================
        case MASTER_LIST_FETCHING: {
            return { ...state, isListLoading: action.isListLoading };
        }

        case MASTER_LIST_FETCHED: {
            return { ...state, masters: action.masters };
        }

        case MASTER_LIST_FETCHED_ERR: {
            return { ...state, listError: action.error };
        }

        // =================== Master Item ===================
        case MASTER_ITEM_FETCHING: {
            return { ...state, isItemLoading: action.isItemLoading };
        }

        case MASTER_ITEM_FETCHED: {
            return { ...state, currentMaster: action.master };
        }

        case MASTER_ITEM_FETCHED_ERR: {
            return { ...state, itemError: action.error };
        }

        // =================== Master Error ===================
        case SET_MASTER_ERROR: {
            return { ...state, error: action.error };
        }

        default: {
            return state;
        }
    }
};

export default mastersReducer;
