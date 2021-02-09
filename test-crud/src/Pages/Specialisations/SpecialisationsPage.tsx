import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Block from '../../components/Block/Block';
import { ISpecialisation } from '../../redux/specialisations/reducer';
import { AppStateType } from '../../redux/store';
import {
    createSpecialisation,
    deleteSpecialisation,
    getSpecialisations,
} from '../../service/specialisations';
import SpecialisationItem from './SpecialisationItem/SpecialisationItem';
import Modal from '../../components/Modal/Modal';
import './SpecialisationsPage.css';

const SpecialisationsPage: React.FC = () => {
    const dispatch = useDispatch();
    const [isActiveModal, setIsActiveModal] = useState(false);
    const [specialisationName, setSpecialisationName] = useState('');
    const currentId = useSelector((state: AppStateType) => state.specialisationList.currentId);
    const isLoading = useSelector((state: AppStateType) => state.specialisationList.isLoading);

    const specialisations: Array<ISpecialisation> = useSelector(
        (state: AppStateType) => state.specialisationList.specialisations,
    );

    useEffect(() => {
        dispatch(getSpecialisations());
        // eslint-disable-next-line
    }, []);

    // Открыть модальное окно
    const openModalClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsActiveModal(true);
    };

    // Инпут имени специализации в модальном окне
    const changeModalInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpecialisationName(e.target.value);
    };

    // Добавить специализацию
    const addSpecialisationClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const newSpec: ISpecialisation = {
            id: currentId + 1,
            name: specialisationName,
            isReadonly: true,
        };

        dispatch(createSpecialisation(newSpec));
    };

    // Закрыть модальное окно
    const closeModalHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsActiveModal(false);
    };

    // Удалить специализацию по id
    const deleteClickHandler = (id: number) => {
        dispatch(deleteSpecialisation(id));
    };

    return (
        <Block>
            <div className="specialisations__header">
                <h2>Специализации</h2>
                <button className="specialisations__add-button" onClick={openModalClickHandler}>
                    Добавить специализацию
                </button>

                {isActiveModal && (
                    <Modal header="специализацию" onCloseModalClick={closeModalHandler}>
                        <input
                            className="modal__content__input"
                            type="text"
                            placeholder="Введите имя специализации"
                            value={specialisationName}
                            onChange={changeModalInputHandler}
                        />

                        <div className="modal__content__actions">
                            <button
                                className="modal__content__actions__buttons"
                                onClick={addSpecialisationClickHandler}>
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
            </div>
            {isLoading && <p className="specialisations__loader">Загрузка...</p>}
            {!isLoading && (
                <div className="specialisations__body">
                    {specialisations.map((item: ISpecialisation) => {
                        return (
                            <SpecialisationItem
                                key={item.id}
                                item={item}
                                onDeleteClick={deleteClickHandler}
                            />
                        );
                    })}
                </div>
            )}
        </Block>
    );
};

export default SpecialisationsPage;
