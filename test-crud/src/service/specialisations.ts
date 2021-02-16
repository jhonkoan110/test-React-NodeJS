import {
    specialisationError,
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
        .catch((error) => {
            dispatch(specialisationListFetching(false));
            dispatch(specialisationListFetchedErr(error.message));
        });
};

// Добавить специализацию
export const createSpecialisation = (newSpec: ISpecialisation) => (dispatch: any) => {
    dispatch(specialisationListFetching(true));

    fetch('/api/specialisation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSpec),
    })
        .then((response) => {
            if (!response.ok) {
                switch (response.status) {
                    case 400: {
                        const createError = response.json();
                        createError.then((error) => {
                            console.log(error);
                            dispatch(specialisationListFetching(false));
                            dispatch(specialisationItemFetchedErr(error));
                        });
                        break;
                    }

                    default: {
                        throw new Error('Ошибка сервера');
                    }
                }
            }

            dispatch(specialisationListFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then(() => dispatch(getSpecialisationList()))
        .catch((error) => {
            dispatch(specialisationListFetching(false));
            dispatch(specialisationItemFetchedErr(error.message));
        });
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

// Обновить специализацию по id
export const updateSpecialisation = (newSpec: ISpecialisation) => (dispatch: any) => {
    dispatch(specialisationItemFetching(true));

    fetch('/api/specialisation', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSpec),
    })
        .then((response) => {
            if (!response.ok) {
                switch (response.status) {
                    case 400: {
                        const validationError = response.json();
                        validationError.then((error) => {
                            console.log(error);

                            dispatch(specialisationItemFetching(false));
                            dispatch(specialisationError(error));
                        });
                        break;
                    }

                    case 404: {
                        const notFoundError = response.json();
                        notFoundError.then((error) => {
                            dispatch(specialisationItemFetching(false));
                            dispatch(specialisationError(error));
                        });
                        break;
                    }

                    default: {
                        throw new Error('Ошибка сервера');
                    }
                }
            }
            dispatch(specialisationItemFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then(() => dispatch(getOneSpecialisation(newSpec.id)))
        .catch((error) => {
            dispatch(specialisationItemFetching(false));
            dispatch(specialisationError(error));
        });
};

// Удалить специализацию по id
export const deleteSpecialisation = (id: number) => (dispatch: any) => {
    dispatch(specialisationItemFetching(true));

    fetch(`/api/specialisation/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
                switch (response.status) {
                    case 400: {
                        const deleteError = response.json();
                        deleteError.then((error) => {
                            dispatch(specialisationItemFetching(false));
                            dispatch(specialisationError(error));
                        });
                        break;
                    }

                    case 404: {
                        const notFoundError = response.json();
                        notFoundError.then((error) => {
                            dispatch(specialisationItemFetching(false));
                            dispatch(specialisationError(error));
                        });
                        break;
                    }

                    default: {
                        throw new Error('Ошибка сервера');
                    }
                }
            }
            dispatch(specialisationItemFetching(false));
            return response;
        })
        .catch((error) => {
            dispatch(specialisationItemFetching(false));
            dispatch(specialisationError(error));
        });
};
