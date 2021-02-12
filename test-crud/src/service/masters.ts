import { IMaster } from './../redux/masters/reducer';
import {
    setMasters,
    addMaster,
    deleteMaster,
    mastersAreLoading,
    mastersHasErrored,
    saveUpdatedMaster,
} from './../redux/masters/actionCreators';
import { getSpecialisations } from './specialisations';
import { getMasterProfile } from './profile';

// Запрос на сервер + обработка ошибки
const fetchData = (dispatch: any, url: string, requestParams: any = null) => {
    return fetch(url, requestParams).then((response) => {
        if (response.status !== 200) {
            dispatch(mastersAreLoading(false));
            throw Error(response.statusText);
        }
        dispatch(mastersAreLoading(false));
        return response;
    });
};

// export const getMasters = () => (dispatch: any) => {
//     console.log('test');

//     fetch('/api/master')
//         .then((res) => res.json())
//         .then((masters) => console.log(masters));
// };

// Получить всех мастеров
export const getMasters = () => (dispatch: any) => {
    dispatch(mastersAreLoading(true));
    dispatch(getSpecialisations());

    fetchData(dispatch, `/api/master`)
        .then((res) => res.json())
        .then((masters) => {
            const mastersWithFlags: Array<IMaster> = masters.map((item: IMaster) => {
                item = { ...item, isReadonly: true };
                return item;
            });

            dispatch(setMasters(mastersWithFlags));
        })
        .catch(() => dispatch(mastersHasErrored(true)));
};

// Удалить мастера по id
export const deleteMasterFetch = (id: number) => (dispatch: any) => {
    fetchData(dispatch, `/api/master/${id}`, {
        method: 'DELETE',
    })
        .then(() => {
            dispatch(deleteMaster(id));
            dispatch(getMasterProfile(id));
            dispatch(getMasters());
        })
        .catch(() => dispatch(mastersHasErrored(true)));
};

// Добавить нового мастера
export const createMaster = (newMaster: IMaster) => (dispatch: any) => {
    fetchData(dispatch, `/api/master`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMaster),
    })
        .then(() => {
            dispatch(addMaster(newMaster));
            dispatch(getMasters());
        })
        .catch(() => dispatch(mastersHasErrored(true)));
};

// Обновить мастера по id
export const updateMaster = (updatedMaster: IMaster) => (dispatch: any) => {
    dispatch(mastersAreLoading(true));

    fetchData(dispatch, `/api/master`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMaster),
    })
        .then(() => {
            dispatch(saveUpdatedMaster(updatedMaster));

            dispatch(getMasters());
        })
        .catch(() => dispatch(mastersHasErrored(true)));
};
