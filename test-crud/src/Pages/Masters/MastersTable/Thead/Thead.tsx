import React from 'react';
import './Thead.css';

const Thead = () => {
    return (
        <thead className="thead">
            <tr className="thead__row">
                <td className="thead__col">Логин</td>
                <td className="thead__col">Фамилия</td>
                <td className="thead__col">Имя</td>
                <td className="thead__col">Отчество</td>
                <td className="thead__col">Специализация</td>
                <td className="thead__col">Действия</td>
            </tr>
        </thead>
    );
};

export default Thead;
