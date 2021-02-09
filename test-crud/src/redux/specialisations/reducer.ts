import {
    SET_SPECIALISATIONS,
    IS_LOADING,
    HAS_ERRORED,
    START_EDIT,
    DELETE_SPECIALISATION,
    ADD_SPECIALISATION,
    SAVE_UPDATED_SPECIALISATION,
} from './actionTypes';
export interface ISpecialisation {
    id: number;
    isReadonly?: boolean;
    name: string;
}

const initialState = {
    isLoading: false,
    hasErrored: false,
    specialisations: [] as Array<ISpecialisation>,
    currentId: 0,
};

type InitialStateType = typeof initialState;

const specialisationsReducer = (state: InitialStateType = initialState, action: any) => {
    switch (action.type) {
        case IS_LOADING: {
            return { ...state, isLoading: action.bool };
        }

        case HAS_ERRORED: {
            return { ...state, hasErrored: action.bool };
        }

        case ADD_SPECIALISATION: {
            return { ...state, specialisations: [...state.specialisations, action.newSpec] };
        }

        case DELETE_SPECIALISATION: {
            return {
                ...state,
                specialisations: state.specialisations.filter((item) => item.id !== action.id),
            };
        }

        case START_EDIT: {
            const newSpecialisations = state.specialisations.map((item) => {
                if (item.id === action.id) {
                    item.isReadonly = false;
                }
                return item;
            });
            return { ...state, specialisations: newSpecialisations };
        }

        case SAVE_UPDATED_SPECIALISATION: {
            const newSpecialisations = state.specialisations.map((item) => {
                if (item.id === action.newSpec.id) {
                    item = action.newSpec;
                }
                return item;
            });
            return { ...state, specialisations: newSpecialisations };
        }

        case SET_SPECIALISATIONS: {
            return {
                ...state,
                specialisations: [...action.specialisations],
                currentId: action.specialisations.length
                    ? action.specialisations[action.specialisations.length - 1].id
                    : 0,
            };
        }

        default:
            return state;
    }
};

export default specialisationsReducer;
