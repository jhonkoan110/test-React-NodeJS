import { IMaster } from './../redux/masters/reducer';
import {
    profileHasErrord,
    profileIsLoading,
    saveUpdatedProfile,
    setProfile,
} from '../redux/profile/actionCreators';
import { getSpecialisations } from './specialisations';

// Получить одного мастера по id
export const getMasterProfile = (id: number) => (dispatch: any) => {
    dispatch(profileIsLoading(true));
    dispatch(getSpecialisations());

    fetch(`/api/master/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(profileIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((profile) => dispatch(setProfile(profile)))
        .catch(() => dispatch(profileHasErrord(true)));
};

// Обновить мастера
export const updateMasterProfile = (updatedMaster: IMaster) => (dispatch: any) => {
    dispatch(profileIsLoading(true));

    fetch(`/api/master`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMaster),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(profileIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((profile) => {
            dispatch(saveUpdatedProfile(profile));
            dispatch(getMasterProfile(updatedMaster.id));
        })
        .catch(() => dispatch(profileHasErrord(true)));
};
