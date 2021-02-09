import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startEdit } from '../../../redux/specialisations/actionCreators';
import { ISpecialisation } from '../../../redux/specialisations/reducer';
import { updateSpecialisation } from '../../../service/specialisations';
import './SpecialisationItem.css';

interface SpecialisationItemProps {
    item: ISpecialisation;
    onDeleteClick: (id: number) => void;
}

const SpecialisationItem: React.FC<SpecialisationItemProps> = ({ item, onDeleteClick }) => {
    const { id, isReadonly } = item;
    const [name, setName] = useState(item.name);
    const dispatch = useDispatch();

    // Начать редактирование
    const startEditClickHandler = (id: number) => {
        dispatch(startEdit(id));
    };

    // Обработчик name инпута
    const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const saveEditClickHandler = (id: number, name: string) => {
        const updatedSpec: ISpecialisation = {
            id,
            name,
            isReadonly: true,
        };
        dispatch(updateSpecialisation(updatedSpec, id));
    };

    return (
        <div className="specialisations__item">
            <input
                className="specialisations__item__name"
                type="text"
                value={name}
                readOnly={isReadonly}
                onChange={changeNameHandler}
            />
            <div className="buttons">
                {isReadonly ? (
                    <button className="item__buttons" onClick={() => startEditClickHandler(id)}>
                        Редактировать
                    </button>
                ) : (
                    <button
                        className="item__buttons"
                        onClick={() => saveEditClickHandler(id, name)}>
                        Сохранить
                    </button>
                )}

                <button className="item__buttons" onClick={() => onDeleteClick(id)}>
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default SpecialisationItem;
