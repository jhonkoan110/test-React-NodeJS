import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Block from '../../../components/Block/Block';
import BlockBody from '../../../components/BlockBody/BlockBody';
import BlockHeader from '../../../components/BlockHeader/BlockHeader';
import Error from '../../../components/Error/Error';
import Loader from '../../../components/Loader/Loader';
import { specialisationItemFetchedErr } from '../../../redux/specialisations/actionCreators';
import { ISpecialisation } from '../../../redux/specialisations/reducer';
import { AppStateType } from '../../../redux/store';
import { createSpecialisation, getSpecialisationList } from '../../../service/specialisations';
import SpecialisationsList from '../SpecialisationsList/SpecialisationsList';
import SpecialisationsModal from '../SpecialisationsModal/SpecialisationsModal';
import './SpecialisationsPage.css';

const SpecialisationsPage: React.FC = () => {
    const error = useSelector((state: AppStateType) => state.specialisationsList.listError);
    const creatingError = useSelector((state: AppStateType) => state.specialisationsList.itemError);
    const isLoading = useSelector((state: AppStateType) => state.specialisationsList.isListLoading);
    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [specialisation, setSpecialisation] = useState({
        id: 0,
        name: '',
    });
    const specialisations = useSelector(
        (state: AppStateType) => state.specialisationsList.specialisations,
    );

    useEffect(() => {
        dispatch(getSpecialisationList());
    }, []);

    // Открыть модальное окно
    const openModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenModal(true);
    };

    // Закрыть модальное окно
    const closeModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(specialisationItemFetchedErr(null));
        setIsOpenModal(false);
    };

    // Обработчик инпута
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(specialisationItemFetchedErr(null));
        setSpecialisation({
            ...specialisation,
            name: e.target.value,
        });
    };

    // Добавить новую специализацию
    const addSpecialisationHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const newSpec: ISpecialisation = {
            id: 0,
            name: specialisation.name,
        };
        dispatch(createSpecialisation(newSpec));
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error !== null) {
        return <Error message={error} />;
    }

    return (
        <Block>
            <BlockHeader
                header="Специализации"
                buttonText="Добавить специализацию"
                onOpenModalClick={openModalHandler}
            />

            <BlockBody>
                <SpecialisationsList specialisations={specialisations} />

                {isOpenModal && (
                    <SpecialisationsModal
                        isEdit={false}
                        header="Добавить специализацию"
                        error={creatingError ? creatingError.name : creatingError}
                        specisalisation={specialisation}
                        onCloseModal={closeModalHandler}
                        changeHandler={changeHandler}
                        actionClick={addSpecialisationHandler}
                    />
                )}
            </BlockBody>
        </Block>
    );
};

export default SpecialisationsPage;
