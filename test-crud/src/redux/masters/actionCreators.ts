import {
    MASTER_LIST_FETCHED,
    MASTER_LIST_FETCHING,
    MASTER_LIST_FETCHED_ERR,
    MASTER_ITEM_FETCHING,
    MASTER_ITEM_FETCHED,
    MASTER_ITEM_FETCHED_ERR,
    SET_MASTER_ERROR,
} from './actionTypes';
import { IMaster, IMasterError } from './reducer';

// ======================= Для списка мастеров =======================

// Список загружается
export const masterListFetching = (isListLoading: boolean) => ({
    type: MASTER_LIST_FETCHING,
    isListLoading,
});

// Список загрузился
export const masterListFetched = (masters: IMaster) => ({
    type: MASTER_LIST_FETCHED,
    masters,
});

// Список не загрузился, ошибка
export const masterListFetchedErr = (error: string) => ({
    type: MASTER_LIST_FETCHED_ERR,
    error,
});

// ======================= Для одного мастера =======================

// Мастер загружается
export const masterItemFetching = (isItemLoading: boolean) => ({
    type: MASTER_ITEM_FETCHING,
    isItemLoading,
});

// Мастер загрузился
export const masterItemFetched = (master: IMaster) => ({
    type: MASTER_ITEM_FETCHED,
    master,
});

// Мастер не загрузился, ошибка
export const masterItemFetchedErr = (error: string) => ({
    type: MASTER_ITEM_FETCHED_ERR,
    error,
});

// Общая ошибка
export const setMasterError = (error: null | IMasterError) => ({
    type: SET_MASTER_ERROR,
    error,
});
