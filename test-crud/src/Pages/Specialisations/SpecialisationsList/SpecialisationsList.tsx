import React from 'react';
import { ISpecialisation } from '../../../redux/specialisations/reducer';
import SpecialisationItem from './SpecialisationItem/SpecialisationItem';

interface SpecialisationListProps {
    specialisations: Array<ISpecialisation>;
}

const SpecialisationsList: React.FC<SpecialisationListProps> = ({ specialisations }) => {
    return (
        <div className="specialisations__list">
            {specialisations.map((item: ISpecialisation) => {
                return <SpecialisationItem specialisation={item} key={item.id} />;
            })}
        </div>
    );
};

export default SpecialisationsList;
