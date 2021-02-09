import React from 'react';
import { IMaster } from '../../../redux/masters/reducer';

interface TbodyRowProps {
    item: IMaster;
    onDeleteClick: (id: number) => void;
}

const TbodyRow: React.FC<TbodyRowProps> = ({ item, onDeleteClick }) => {
    const { id, login, firstname, lastname, middlename, name } = item;

    return (
        <tr className="tbody__row">
            <td className="tbody__col">{login}</td>
            <td className="tbody__col">{lastname}</td>
            <td className="tbody__col">{firstname}</td>
            <td className="tbody__col">{middlename}</td>
            <td className="tbody__col">{name}</td>
            <td className="tbody__col">
                <button className="item__buttons">Редактировать</button>
                <button className="item__buttons" onClick={() => onDeleteClick(id)}>
                    Удалить
                </button>
            </td>
        </tr>
    );
};

export default TbodyRow;
