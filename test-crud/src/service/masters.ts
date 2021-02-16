import { error } from 'console';
import {
    masterItemFetched,
    masterItemFetchedErr,
    masterItemFetching,
    masterListFetched,
    masterListFetchedErr,
    masterListFetching,
    setMasterError,
} from '../redux/masters/actionCreators';
import { IMaster } from '../redux/masters/reducer';
import { getSpecialisationList } from './specialisations';

//  ==================================== Список мастеров ====================================

// Загрузка списка мастеров
export const getMastersList = () => (dispatch: any) => {
    dispatch(getSpecialisationList());
    dispatch(masterListFetching(true));

    fetch('/api/master')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Не удалось получить список мастеров');
            }

            dispatch(masterListFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((masters) => dispatch(masterListFetched(masters)))
        .catch((error) => {
            dispatch(masterListFetching(false));
            dispatch(masterListFetchedErr(error.message));
            console.log(error.message);
        });
};

// Добавление нового мастера
export const createMaster = (newMaster: IMaster) => (dispatch: any) => {
    dispatch(masterItemFetching(true));

    fetch('/api/master', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMaster),
    })
        .then((response) => {
            if (!response.ok) {
                switch (response.status) {
                    case 400: {
                        const validationError = response.json();
                        validationError.then((error) => {
                            dispatch(masterListFetching(false));
                            dispatch(setMasterError(error));
                        });
                        break;
                    }

                    default: {
                        throw new Error('Ошибка сервера');
                    }
                }
            }
            dispatch(masterListFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then(() => dispatch(getMastersList()))
        .catch((error) => {
            dispatch(masterListFetching(false));
            dispatch(masterItemFetchedErr(error.message));
        });
};

// ==================================== Профиль мастера ====================================

// Загрузить одного мастера
export const getMasterProfile = (id: number) => (dispatch: any) => {
    dispatch(getMastersList());
    dispatch(masterItemFetching(true));

    fetch(`/api/master/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Не удалось получить мастера');
            }
            dispatch(masterItemFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((master) => dispatch(masterItemFetched(master)))
        .catch((error) => dispatch(masterItemFetchedErr(error)));
};

// Обновить мастера
export const updateMaster = (updatedMaster: IMaster) => (dispatch: any) => {
    dispatch(masterItemFetching(true));

    fetch('/api/master/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMaster),
    })
        .then((response) => {
            if (!response.ok) {
                switch (response.status) {
                    case 400: {
                        const validationError = response.json();
                        validationError.then((error) => {
                            dispatch(masterItemFetching(false));
                            dispatch(setMasterError(error));
                        });
                        break;
                    }
                    default: {
                        throw new Error('Ошибка сервера');
                    }
                }
            }
            dispatch(masterItemFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then(() => dispatch(getMasterProfile(updatedMaster.id)))
        .catch((error) => {
            dispatch(masterListFetching(false));
            dispatch(setMasterError(error));
        });
};

// Удалить мастера по id
export const deleteMaster = (id: number) => (dispatch: any) => {
    dispatch(masterItemFetching(true));

    fetch(`/api/master/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
                switch (response.status) {
                    case 404: {
                        const deleteError = response.json();
                        deleteError.then((error) => {
                            dispatch(masterItemFetching(false));
                            dispatch(setMasterError(error));
                        });
                        break;
                    }
                    default: {
                        throw new Error('Ошибка сервера');
                    }
                }
                dispatch(masterItemFetching(false));
                return response;
            }
        })
        .catch((error) => dispatch(setMasterError(error)));
};
