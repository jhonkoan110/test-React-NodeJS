import React from 'react';
import { IMaster } from '../../../redux/masters/reducer';
import MasterItem from './Master/MasterItem';
import './MastersList.css';

interface TableProps {
    currentMasters: Array<IMaster>;
}

const MastersList: React.FC<TableProps> = ({ currentMasters }) => {
    return (
        <div className="masters__list">
            {currentMasters.map((master: IMaster) => {
                return <MasterItem key={master.id} master={master} />;
            })}
        </div>
    );
};

export default MastersList;
