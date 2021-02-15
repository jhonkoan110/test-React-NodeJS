import {
    specialisationItemFetched,
    specialisationItemFetchedErr,
} from './../redux/specialisations/actionCreators';
import { ISpecialisation } from './../redux/specialisations/reducer';
import {
    specialisationItemFetching,
    specialisationListFetched,
    specialisationListFetchedErr,
    specialisationListFetching,
} from '../redux/specialisations/actionCreators';

// =================== List ===================

// Загрузка списка специализаций
export const getSpecialisationList = () => (dispatch: any) => {
    dispatch(specialisationListFetching(true));

    fetch('/api/specialisation')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Не удалось получить список специализаций');
            }
            dispatch(specialisationListFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((specialisations) => dispatch(specialisationListFetched(specialisations)))
        .catch((error) => specialisationListFetchedErr(error));
};

// Добавить специализацию
export const createSpecialisation = (newSpec: ISpecialisation) => (dispatch: any) => {
    fetch('/api/specialisation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSpec),
    })
        .then((response) => response.json())
        .then(() => dispatch(getSpecialisationList()));
};

// =================== Item ===================

// Получить одну специализацию по id
export const getOneSpecialisation = (id: number) => (dispatch: any) => {
    dispatch(specialisationItemFetching(true));

    fetch(`/api/specialisation/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Не удалось получить специализацию');
            }
            dispatch(specialisationItemFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((specialisation: ISpecialisation) =>
            dispatch(specialisationItemFetched(specialisation)),
        )
        .catch((error) => dispatch(specialisationItemFetchedErr(error)));
};

// Удалить специализацию по id
export const deleteSpecialisation = (id: number) => (dispatch: any) => {
    fetch(`/api/specialisation/${id}`, {
        method: 'DELETE',
    }).then(() => getSpecialisationList());
    // .then((response) => {
    //     if (response.status === 400) {
    //         // dispatch(specialisationItemFetchedErr(response.json()))
    //         return response.json();
    //     }
    // })
    // .then((data) => dispatch(specialisationItemFetchedErr(data)));
};

// Обновить специализацию по id
export const updateSpecialisation = (newSpec: ISpecialisation) => (dispatch: any) => {
    fetch('/api/specialisation', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSpec),
    }).then(() => dispatch(getOneSpecialisation(newSpec.id)));
};
