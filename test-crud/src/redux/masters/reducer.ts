import { ADD_MASTER, DELETE_MASTER, SET_MASTERS, START_EDIT_MASTER } from './actionTypes';
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

        default:
            return state;
    }
};

export default mastersReducer;
