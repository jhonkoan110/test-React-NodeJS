import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Block from '../../../components/Block/Block';
import BlockBody from '../../../components/BlockBody/BlockBody';
import BlockHeader from '../../../components/BlockHeader/BlockHeader';
import Loader from '../../../components/Loader/Loader';
import DeleteModal from '../../../components/Modal/DeleteModal/DeleteModal';
import { ISpecialisation } from '../../../redux/specialisations/reducer';
import { AppStateType } from '../../../redux/store';
import {
    deleteSpecialisation,
    getOneSpecialisation,
    updateSpecialisation,
} from '../../../service/specialisations';
import SpecialisationsModal from '../SpecialisationsModal/SpecialisationsModal';
import './SpecialisationInfo.css';

const SpecialisationInfo: React.FC = () => {
    const { id }: any = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector((state: AppStateType) => state.specialisationsList.isItemLoading);
    const error = useSelector((state: AppStateType) => state.specialisationsList.itemError);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const currentSpecialisation = useSelector(
        (state: AppStateType) => state.specialisationsList.currentSpecialisation,
    );

    useEffect(() => {
        dispatch(getOneSpecialisation(id));
    }, []);

    const [spec, setSpec] = useState(currentSpecialisation);

    // Открыть модальное окно удаления
    const openDeleteModalhandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsOpenDeleteModal(true);
    };

    // Закрыть модальное окно удаления
    const closeDeleteModalhandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsOpenDeleteModal(false);
    };

    // Открыть модальное окно редактирования
    const openEditModalHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsOpenEditModal(true);
    };

    // Закрыть модальное окно редактирования
    const closeEditModalHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsOpenEditModal(false);
    };

    // Обработчик инпута
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpec({
            ...spec,
            name: e.target.value,
        });
    };

    // Удалить специализацию
    const deleteSpecialisationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteSpecialisation(currentSpecialisation.id));
    };

    // Сохранить изменения
    const saveUpdatedChangesHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const updatedSpec: ISpecialisation = {
            id: currentSpecialisation.id,
            name: spec.name,
        };

        dispatch(updateSpecialisation(updatedSpec));
        setIsOpenEditModal(false);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (spec) {
        return (
            <Block>
                <BlockHeader header={`Специализация "${currentSpecialisation.name}"`} />
                <BlockBody>
                    {currentSpecialisation.masters.length !== 0 && (
                        <ul className="specialisation-info__masters">
                            Мастера, владеющие этой специализацией:
                            {currentSpecialisation.masters.map((item: any) => {
                                return (
                                    <NavLink to={'/profile/' + item.id} key={item.id}>
                                        <li className="specialisation-info__masters-item">
                                            {item.login}
                                        </li>
                                    </NavLink>
                                );
                            })}
                        </ul>
                    )}

                    {currentSpecialisation.masters.length === 0 && (
                        <div className="specialisation-info__masters">
                            У этой специализации нет мастеров
                        </div>
                    )}

                    <div className="modal__content__actions">
                        <button
                            className="modal__content__actions__buttons"
                            onClick={openEditModalHandler}>
                            Редактировать
                        </button>
                        <button
                            className="modal__content__actions__buttons"
                            onClick={openDeleteModalhandler}>
                            Удалить
                        </button>
                    </div>
                </BlockBody>

                {isOpenEditModal && (
                    <SpecialisationsModal
                        isEdit={true}
                        header="Редактирование специализации"
                        specisalisation={spec}
                        onCloseModal={closeEditModalHandler}
                        changeHandler={changeHandler}
                        actionClick={saveUpdatedChangesHandler}
                    />
                )}

                {isOpenDeleteModal && (
                    <DeleteModal
                        header={`Удаление специализации`}
                        title={`специализацию ${currentSpecialisation.name}`}
                        onCloseModalClick={closeDeleteModalhandler}
                        onDeleteClick={deleteSpecialisationHandler}
                    />
                )}
            </Block>
        );
    }
    return null;
};

export default SpecialisationInfo;
