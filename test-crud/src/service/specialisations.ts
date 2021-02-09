import { ISpecialisation } from './../redux/specialisations/reducer';
import {
    setSpecialisations,
    isLoading,
    hasErrored,
    deleteSpecialisations,
    addSpecialisation,
    saveUpdatedSpecialisation,
} from './../redux/specialisations/actionCreators';

// Получить все специализации с сервера
export const getSpecialisations = () => (dispatch: any) => {
    dispatch(isLoading(true));

    fetch('http://localhost:8080/api/specialisation')
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(isLoading(false));
            return response;
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

    fetch('http://localhost:8080/api/specialisation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSpecialisation),
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(isLoading(false));
            return response;
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
    dispatch(isLoading(true));

    fetch(`http://localhost:8080/api/specialisation/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
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
    fetch(`http://localhost:8080/api/specialisation`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
    });

    dispatch(saveUpdatedSpecialisation(newItem));
    dispatch(getSpecialisations());
};
