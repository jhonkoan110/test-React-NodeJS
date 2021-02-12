import { IMaster } from './../masters/reducer';
import {
    PROFILE_HAS_ERRORED,
    PROFILE_IS_LOADING,
    SAVE_UPDATED_PROFILE,
    SET_PROFILE,
} from './actionTypes';
interface InitialStateType {
    currentProfile: IMaster;
    isLoading: boolean;
    hasErrored: boolean;
}

const initialState: InitialStateType = {
    currentProfile: {
        id: 0,
        login: '',
        firstname: '',
        lastname: '',
        middlename: '',
        specialisation_id: 0,
        name: '',
    },
    isLoading: false,
    hasErrored: false,
};

const profileReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case PROFILE_IS_LOADING: {
            return { ...state, isLoading: action.bool };
        }

        case PROFILE_HAS_ERRORED: {
            return { ...state, hasErrored: action.bool };
        }

        case SET_PROFILE: {
            return { ...state, currentProfile: action.masterProfile };
        }

        case SAVE_UPDATED_PROFILE: {
            return { ...state, currentProfile: action.updatedProfile };
        }

        default:
            return state;
    }
};

export default profileReducer;
