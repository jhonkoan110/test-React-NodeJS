import {
    ADD_MASTER,
    DELETE_MASTER,
    SET_MASTERS,
    START_EDIT_MASTER,
    MASTERS_ARE_LOADING,
    MASTERS_HAS_ERRORED,
    SAVE_UPDATED_MASTER,
} from './actionTypes';
export interface IMaster {
    id: number;
    login: string;
    firstname: string;
    lastname: string;
    middlename: string;
    specialisation_id: number;
    name: string;
    isReadonly: boolean;
}

const initisalState = {
    isLoading: false,
    hasErrored: false,
    masters: [] as Array<IMaster>,
    currentId: 0,
};

type InitialStateType = typeof initisalState;

const mastersReducer = (state: InitialStateType = initisalState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_MASTERS: {
            return {
                ...state,
                masters: action.masters,
                currentId: action.masters.length ? action.masters[action.masters.length - 1].id : 0,
            };
        }

        case ADD_MASTER: {
            return {
                ...state,
                masters: [...state.masters, action.newMaster],
            };
        }

        case DELETE_MASTER: {
            return { ...state, masters: state.masters.filter((item) => item.id !== action.id) };
        }

        case START_EDIT_MASTER: {
            const newMasters = state.masters.map((item) => {
                if (item.id === action.id) {
                    item.isReadonly = false;
                }
                return item;
            });
            return { ...state, masters: newMasters };
        }

        case MASTERS_ARE_LOADING: {
            return { ...state, isLoading: action.bool };
        }

        case MASTERS_HAS_ERRORED: {
            return { ...state, hasErrored: action.bool };
        }

        case SAVE_UPDATED_MASTER: {
            const newMasters: Array<IMaster> = state.masters.map((item: IMaster) => {
                if (item.id === action.newMaster.id) {
                    item = action.newMaster;
                }
                return item;
            });
            return { ...state, masters: newMasters };
        }

        default:
            return state;
    }
};

export default mastersReducer;
