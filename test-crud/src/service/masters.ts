import { IMaster } from './../redux/masters/reducer';
import { setMasters, addMaster, deleteMaster } from './../redux/masters/actionCreators';
import { getSpecialisations } from './specialisations';

// Получить всех мастеров
export const getMasters = () => (dispatch: any) => {
    dispatch(getSpecialisations());
    fetch(`http://localhost:8080/api/master`)
        .then((res) => res.json())
        .then((masters) => dispatch(setMasters(masters)));
};

// Удалить мастера по id
export const deleteMasterFetch = (id: number) => (dispatch: any) => {
    fetch(`http://localhost:8080/api/master/${id}`, {
        method: 'DELETE',
    }).then(() => dispatch(deleteMaster(id)));
};

// Добавить нового мастера
export const createMaster = (newMaster: IMaster) => (dispatch: any) => {
    fetch(`http://localhost:8080/api/master`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMaster),
    }).then(() => {
        dispatch(addMaster(newMaster));
        dispatch(getMasters());
    });
};
