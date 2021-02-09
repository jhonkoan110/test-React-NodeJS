import React from 'react';
import { ISpecialisation } from '../../redux/specialisations/reducer';
import './Dropdown.css';

interface DropdownProps {
    name?: string;
    selectedSpec: string;
    specialisations: Array<ISpecialisation>;
    onSpecClick: (id: number, specialisation: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    name,
    selectedSpec,
    specialisations,
    onSpecClick,
}) => {
    return (
        <div className="dropdown">
            <div className="dropdown__select">
                <div className="select">
                    <span className="select-placeholder">
                        {selectedSpec || name || 'Выберите специализацию'}
                    </span>
                </div>
                <div className="triangle"></div>
            </div>
            <div className="dropdown__list">
                {specialisations.map((item: ISpecialisation) => {
                    return (
                        <div
                            key={item.id}
                            className="dropdown__list__item"
                            onClick={() => onSpecClick(item.id, item.name)}>
                            {item.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dropdown;
