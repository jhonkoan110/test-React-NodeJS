import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import mastersReducer from './masters/reducer';
import specialisationsReducer from './specialisations/reducer';

const rootReducer = combineReducers({
    specialisationList: specialisationsReducer,
    masterList: mastersReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
