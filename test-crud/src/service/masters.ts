import {
    masterItemFetched,
    masterItemFetchedErr,
    masterItemFetching,
    masterListFetched,
    masterListFetchedErr,
    masterListFetching,
} from '../redux/masters/actionCreators';
import { IMaster } from '../redux/masters/reducer';
import { getSpecialisationList } from './specialisations';

// Список мастеров:
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
        .catch((error) => dispatch(masterListFetchedErr(error)));
};

// Добавление нового мастера
export const createMaster = (newMaster: IMaster) => (dispatch: any) => {
    fetch('/api/master', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMaster),
    })
        .then((response) => response.json())
        .then(() => dispatch(getMastersList()));
};

// ==================================== Профиль мастера ====================================

// Загрузить одного мастера
export const getMasterProfile = (id: number) => (dispatch: any) => {
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

// Удалить мастера по id
export const deleteMaster = (id: number) => (dispatch: any) => {
    fetch(`/api/master/${id}`, {
        method: 'DELETE',
    });
};
