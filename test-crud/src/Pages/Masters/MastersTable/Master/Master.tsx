import React from 'react';
import { NavLink } from 'react-router-dom';
import { IMaster } from '../../../../redux/masters/reducer';
import './Master.css';

interface MasterProps {
    master: IMaster;
}

const Master: React.FC<MasterProps> = ({ master }) => {
    return (
        <NavLink to={'/profile/' + master.id}>
            <div className="master">{master.login}</div>
        </NavLink>
    );
};

export default Master;
