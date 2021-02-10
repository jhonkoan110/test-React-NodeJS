import React from 'react';
import { IMaster } from '../../../redux/masters/reducer';
import './Table.css';
import Tbody from './Tbody/Tbody';
import Tfoot from './Tfoot/Tfoot';
import Thead from './Thead/Thead';

interface TableProps {
    currentMasters: Array<IMaster>;
}

const MastersTable: React.FC<TableProps> = ({ currentMasters }) => {
    return (
        <table className="masters__table">
            <Thead />
            <Tfoot />
            <Tbody currentMasters={currentMasters} />
        </table>
    );
};

export default MastersTable;
