import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startEditMaster } from '../../../../redux/masters/actionCreators';
import { IMaster } from '../../../../redux/masters/reducer';
import { AppStateType } from '../../../../redux/store';
import { updateMaster } from '../../../../service/masters';
import Dropdown from '../../../../components/Dropdown/Dropdown';
import Input from '../../../../components/Input/Input';
import { NavLink } from 'react-router-dom';

interface TbodyRowProps {
    item: IMaster;
    onDeleteClick: (id: number) => void;
}

const TbodyRow: React.FC<TbodyRowProps> = ({ item, onDeleteClick }) => {
    const {
        id,
        login,
        firstname,
        lastname,
        middlename,
        name,
        isReadonly,
        specialisation_id,
    } = item;
    const dispatch = useDispatch();

    const [master, setMaster] = useState({
        login: login,
        firstname: firstname,
        lastname: lastname,
        middlename: middlename,
        specialisation_id: specialisation_id,
    });

    const specialisations = useSelector(
        (state: AppStateType) => state.specialisationList.specialisations,
    );
    const [selectedSpec, setSelectedSpec] = useState('');

    // Выбрать специализацию
    const selectSpecialisationClickHandler = (id: number, specialisationName: string) => {
        setSelectedSpec(specialisationName);
        setMaster({
            ...master,
            specialisation_id: id,
        });
    };

    // Обработчик инпутов
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(master);
        setMaster({
            ...master,
            [e.target.id]: e.target.value,
        });
    };

    // Начать редактирование мастера
    const startEditClickHandler = (id: number) => {
        dispatch(startEditMaster(id));
    };

    //Сохранить обновленного мастера
    const saveEditClickHandler = (id: number, master: any) => {
        const updatedMaster: IMaster = {
            id,
            isReadonly: true,
            login: master.login,
            firstname: master.firstname,
            lastname: master.lastname,
            middlename: master.middlename,
            name: name,
            specialisation_id: master.specialisation_id,
        };
        dispatch(updateMaster(updatedMaster));
    };

    return (
        <NavLink to={'/profile/' + item.id}>
            <tr className="tbody__row">
                <td className="tbody__col">
                    <Input
                        changeHandler={changeHandler}
                        inputId="login"
                        value={master.login}
                        isReadonly={isReadonly}
                    />
                </td>
                <td className="tbody__col">
                    <Input
                        changeHandler={changeHandler}
                        inputId="lastname"
                        value={master.lastname}
                        isReadonly={isReadonly}
                    />
                </td>
                <td className="tbody__col">
                    <Input
                        changeHandler={changeHandler}
                        inputId="firstname"
                        value={master.firstname}
                        isReadonly={isReadonly}
                    />
                </td>
                <td className="tbody__col">
                    <Input
                        changeHandler={changeHandler}
                        inputId="middlename"
                        value={master.middlename}
                        isReadonly={isReadonly}
                    />
                </td>
                <td className="tbody__col">
                    {!isReadonly && (
                        <Dropdown
                            name={name}
                            selectedSpec={selectedSpec}
                            specialisations={specialisations}
                            onSpecClick={selectSpecialisationClickHandler}
                        />
                    )}
                    {isReadonly && (
                        <Input
                            changeHandler={changeHandler}
                            inputId="name"
                            value={name}
                            isReadonly={isReadonly}
                        />
                    )}
                </td>
                <td className="tbody__col">
                    {isReadonly ? (
                        <button className="item__buttons" onClick={() => startEditClickHandler(id)}>
                            Редактировать
                        </button>
                    ) : (
                        <button
                            className="item__buttons"
                            onClick={() => saveEditClickHandler(id, master)}>
                            Сохранить
                        </button>
                    )}

                    <button className="item__buttons" onClick={() => onDeleteClick(id)}>
                        Удалить
                    </button>
                </td>
            </tr>
        </NavLink>
    );
};

export default TbodyRow;
