import { ISpecialisation } from './../redux/specialisations/reducer';
import {
    setSpecialisations,
    isLoading,
    hasErrored,
    deleteSpecialisations,
    addSpecialisation,
    saveUpdatedSpecialisation,
    setDeleteError,
} from './../redux/specialisations/actionCreators';

// Запрос на сервер + обработка ошибки
const fetchData = (dispatch: any, url: string, requestParams: any = null) => {
    return fetch(url, requestParams).then((response: any) => {
        if (response.status === 400) {
            dispatch(isLoading(false));
            throw Error('У этой специализации ещё есть мастер(-а).');
        }
        if (response.status !== 200) {
            dispatch(isLoading(false));
            throw Error(response.statusText);
        }
        dispatch(isLoading(false));
        return response;
    });
};

// Получить все специализации с сервера
export const getSpecialisations = () => (dispatch: any) => {
    dispatch(isLoading(true));

    fetchData(dispatch, '/api/specialisation', {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    })
        .then((response) => response.json())
        .then((specialisations) => {
            const specialisationsWithFlags = specialisations.map((item: ISpecialisation) => {
                item = { ...item, isReadonly: true };
                return item;
            });
            dispatch(setSpecialisations(specialisationsWithFlags));
        })
        .catch(() => dispatch(hasErrored(true)));
};

// Добавить новую специализацию
export const createSpecialisation = (newSpecialisation: ISpecialisation) => (dispatch: any) => {
    dispatch(isLoading(true));

    fetchData(dispatch, '/api/specialisation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSpecialisation),
    })
        .then((response) => response.json())
        .then((data) => {
            dispatch(addSpecialisation(data));
            dispatch(getSpecialisations());
        })
        .catch(() => dispatch(hasErrored(true)));
};

// Удалить специализацию по id
export const deleteSpecialisation = (id: number) => (dispatch: any) => {
    fetch(`/api/specialisation/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (response.status === 400) {
                const deleteError = response.json();
                deleteError.then((error) => dispatch(setDeleteError(error.title)));
            }
            if (!response.ok && response.status !== 400) {
                throw Error(response.statusText);
            }

            dispatch(isLoading(false));
            return response;
        })
        .then(() => {
            dispatch(deleteSpecialisations(id));
            dispatch(getSpecialisations());
        })
        .catch(() => dispatch(hasErrored(true)));
};

// Обновить специализацию по id
export const updateSpecialisation = (newItem: ISpecialisation, id: number) => (dispatch: any) => {
    fetchData(dispatch, `/api/specialisation`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
    })
        .then(() => {
            dispatch(saveUpdatedSpecialisation(newItem));
            dispatch(getSpecialisations());
        })
        .catch(() => {
            dispatch(hasErrored(true));
        });
};
