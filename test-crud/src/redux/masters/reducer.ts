import { ADD_MASTER, DELETE_MASTER, SET_MASTERS } from './actionTypes';
export interface IMaster {
    id: number;
    login: string;
    firstname: string;
    lastname: string;
    middlename: string;
    specialisationId: number;
    name: string;
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

        default:
            return state;
    }
};

export default mastersReducer;
