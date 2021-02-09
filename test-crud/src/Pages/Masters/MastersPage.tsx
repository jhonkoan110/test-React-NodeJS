import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Block from '../../components/Block/Block';
import Dropdown from '../../components/Dropdown/Dropdown';
import Modal from '../../components/Modal/Modal';
import Table from '../../components/Table/Table';
import { IMaster } from '../../redux/masters/reducer';
import { AppStateType } from '../../redux/store';
import { createMaster, getMasters } from '../../service/masters';
import './MastersPage.css';

const MastersPage = () => {
    const [isActiveModal, setIsActiveModal] = useState(false);
    const dispatch = useDispatch();
    const [master, setMaster] = useState({
        login: '',
        firstname: '',
        lastname: '',
        middlename: '',
        specialisation_id: 0,
    });
    const currentId = useSelector((state: AppStateType) => state.masterList.currentId);
    const [selectedSpec, setSelectedSpec] = useState('');
    const specialisations = useSelector(
        (state: AppStateType) => state.specialisationList.specialisations,
    );

    useEffect(() => {
        dispatch(getMasters());
        // eslint-disable-next-line
    }, []);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaster({
            ...master,
            [e.target.id]: e.target.value,
        });
    };

    // Открыть модальное окно
    const openModalClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsActiveModal(true);
    };

    // Закрыть модальное окно
    const closeModalHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsActiveModal(false);
    };

    // Выбрать специализацию
    const selectSpecialisationClickHandler = (id: number, specialisationName: string) => {
        setSelectedSpec(specialisationName);
        setMaster({
            ...master,
            specialisation_id: id,
        });
    };

    // Добавить мастера
    const addMasterClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const newMaster: IMaster = {
            id: currentId + 1,
            firstname: master.firstname,
            login: master.login,
            lastname: master.lastname,
            middlename: master.middlename,
            specialisation_id: master.specialisation_id,
            name: selectedSpec,
            isReadonly: true,
        };

        console.log(newMaster);

        dispatch(createMaster(newMaster));
    };

    return (
        <Block>
            <div className="masters__header">
                <h2>Мастера</h2>
                <button className="masters__add-button" onClick={openModalClickHandler}>
                    Добавить мастера
                </button>
            </div>

            {isActiveModal && (
                <Modal header="мастера" onCloseModalClick={closeModalHandler}>
                    <input
                        id="login"
                        className="modal__content__input"
                        type="text"
                        placeholder="Введите логин мастера"
                        value={master.login}
                        onChange={changeHandler}
                    />
                    <input
                        id="firstname"
                        className="modal__content__input"
                        type="text"
                        placeholder="Введите имя мастера"
                        value={master.firstname}
                        onChange={changeHandler}
                    />
                    <input
                        id="lastname"
                        className="modal__content__input"
                        type="text"
                        placeholder="Введите фамилию мастера"
                        value={master.lastname}
                        onChange={changeHandler}
                    />
                    <input
                        id="middlename"
                        className="modal__content__input"
                        type="text"
                        placeholder="Введите отчество мастера"
                        value={master.middlename}
                        onChange={changeHandler}
                    />
                    <Dropdown
                        selectedSpec={selectedSpec}
                        specialisations={specialisations}
                        onSpecClick={selectSpecialisationClickHandler}
                    />

                    <div className="modal__content__actions">
                        <button
                            className="modal__content__actions__buttons"
                            onClick={addMasterClickHandler}>
                            Добавить
                        </button>
                        <button
                            className="modal__content__actions__buttons"
                            onClick={closeModalHandler}>
                            Закрыть
                        </button>
                    </div>
                </Modal>
            )}
            <div className="masters__body">
                <Table />
            </div>
        </Block>
    );
};

export default MastersPage;
