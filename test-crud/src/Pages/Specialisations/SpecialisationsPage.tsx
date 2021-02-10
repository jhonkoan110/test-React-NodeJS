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
import './SpecialisationsPage.css';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import SpecialisationModal from './SpecialisationModal/SpecialisationModal';

const SpecialisationsPage: React.FC = () => {
    const dispatch = useDispatch();
    const [isActiveModal, setIsActiveModal] = useState(false);
    const [specialisationName, setSpecialisationName] = useState('');
    const currentId = useSelector((state: AppStateType) => state.specialisationList.currentId);
    const { isLoading, hasErrored } = useSelector(
        (state: AppStateType) => state.specialisationList,
    );

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

    if (isLoading) {
        return <Loader />;
    }

    if (hasErrored) {
        return <Error />;
    }

    return (
        <Block>
            <div className="specialisations__header">
                <h2>Специализации</h2>
                <button className="specialisations__add-button" onClick={openModalClickHandler}>
                    Добавить специализацию
                </button>

                {isActiveModal && (
                    <SpecialisationModal
                        specialisationName={specialisationName}
                        closeModalHandler={closeModalHandler}
                        onChangeModalInput={changeModalInputHandler}
                        onAddSpecialisationClick={addSpecialisationClickHandler}
                    />
                )}
            </div>

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
        </Block>
    );
};

export default SpecialisationsPage;
