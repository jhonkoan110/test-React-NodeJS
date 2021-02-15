import {
    SPECIALISATION_ITEM_FETCHED,
    SPECIALISATION_ITEM_FETCHED_ERR,
    SPECIALISATION_ITEM_FETCHING,
    SPECIALISATION_LIST_FETCHED,
    SPECIALISATION_LIST_FETCHED_ERR,
    SPECIALISATION_LIST_FETCHING,
} from './actionTypes';
import { ISpecialisation } from './reducer';

// Для списка специализаций
export const specialisationListFetching = (isListLoading: boolean) => ({
    type: SPECIALISATION_LIST_FETCHING,
    isListLoading,
});
export const specialisationListFetched = (specialisations: Array<ISpecialisation>) => ({
    type: SPECIALISATION_LIST_FETCHED,
    specialisations,
});
export const specialisationListFetchedErr = (error: string) => ({
    type: SPECIALISATION_LIST_FETCHED_ERR,
    error,
});

//Для отдельной специализации
export const specialisationItemFetching = (isItemLoading: boolean) => ({
    type: SPECIALISATION_ITEM_FETCHING,
    isItemLoading,
});

export const specialisationItemFetched = (specialisation: ISpecialisation) => ({
    type: SPECIALISATION_ITEM_FETCHED,
    specialisation,
});

export const specialisationItemFetchedErr = (error: string) => ({
    type: SPECIALISATION_ITEM_FETCHED_ERR,
    error,
});
