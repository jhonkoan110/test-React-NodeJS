import { IMaster } from './../masters/reducer';
import {
    PROFILE_HAS_ERRORED,
    PROFILE_IS_LOADING,
    SET_PROFILE,
    SAVE_UPDATED_PROFILE,
} from './actionTypes';

export const profileIsLoading = (bool: boolean) => ({ type: PROFILE_IS_LOADING, bool });

export const profileHasErrord = (bool: boolean) => ({ type: PROFILE_HAS_ERRORED, bool });

export const setProfile = (masterProfile: IMaster) => ({ type: SET_PROFILE, masterProfile });

export const saveUpdatedProfile = (updatedProfile: IMaster) => ({
    type: SAVE_UPDATED_PROFILE,
    updatedProfile,
});
