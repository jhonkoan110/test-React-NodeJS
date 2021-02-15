import React from 'react';
import { NavLink } from 'react-router-dom';
import { IMaster } from '../../../../redux/masters/reducer';
import './Master.css';

interface MasterItemProps {
    master: IMaster;
}

const MasterItem: React.FC<MasterItemProps> = ({ master }) => {
    const { id, login, firstname, lastname, middlename, name } = master;
    return (
        <NavLink to={'/profile/' + id}>
            <div className="master">
                <div className="master__login">{login}</div>
                <div className="master__info">
                    {name} {lastname} {firstname} {middlename}
                </div>
            </div>
        </NavLink>
    );
};

export default MasterItem;
