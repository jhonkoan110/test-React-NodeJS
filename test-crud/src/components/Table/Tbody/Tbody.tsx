import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMaster } from '../../../redux/masters/reducer';
import { AppStateType } from '../../../redux/store';
import { deleteMasterFetch } from '../../../service/masters';
import './Tbody.css';
import TbodyRow from './TbodyRow';

const Tbody: React.FC = () => {
    const masters: Array<IMaster> = useSelector((state: AppStateType) => state.masterList.masters);
    const dispatch = useDispatch();

    // Удалить мастера по id
    const deleteMasterHandler = (id: number) => {
        dispatch(deleteMasterFetch(id));
    };

    return (
        <tbody className="tbody">
            {masters.map((item: IMaster) => {
                return <TbodyRow key={item.id} item={item} onDeleteClick={deleteMasterHandler} />;
            })}
        </tbody>
    );
};

export default Tbody;
