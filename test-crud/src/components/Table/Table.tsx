import React from 'react';
import './Table.css';
import Tbody from './Tbody/Tbody';
import Tfoot from './Tfoot/Tfoot';
import Thead from './Thead/Thead';

const Table: React.FC = () => {
    return (
        <table className="masters__table">
            <Thead />
            <Tfoot />
            <Tbody />
        </table>
    );
};

export default Table;
