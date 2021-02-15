import React from 'react';
import { NavLink } from 'react-router-dom';
import { ISpecialisation } from '../../../../redux/specialisations/reducer';
import './SpecialisationItem.css';

interface SpecialisationItemProps {
    specialisation: ISpecialisation;
}

const SpecialisationItem: React.FC<SpecialisationItemProps> = ({ specialisation }) => {
    return (
        <NavLink to={'/specialisation_info/' + specialisation.id}>
            <div className="specialisation">
                <div className="specialisation__name">{specialisation.name}</div>
            </div>
        </NavLink>
    );
};

export default SpecialisationItem;
