import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Block from '../../../components/Block/Block';
import BlockBody from '../../../components/BlockBody/BlockBody';
import BlockHeader from '../../../components/BlockHeader/BlockHeader';
import Loader from '../../../components/Loader/Loader';
import DeleteModal from '../../../components/Modal/DeleteModal/DeleteModal';
import { setMasterError } from '../../../redux/masters/actionCreators';
import { IMaster } from '../../../redux/masters/reducer';
import { AppStateType } from '../../../redux/store';
import { deleteMaster, getMasterProfile, updateMaster } from '../../../service/masters';
import MastersModal from '../MastersModal/MastersModal';
import './MasterProfile.css';

interface MasterProfileProps {}

const MasterProfile: React.FC = () => {
    const { id }: any = useParams();
    const dispatch = useDispatch();
    const currentMaster = useSelector((state: AppStateType) => state.masterList.currentMaster);
    const specialisations = useSelector(
        (state: AppStateType) => state.specialisationsList.specialisations,
    );
    const isLoading = useSelector((state: AppStateType) => state.masterList.isItemLoading);
    const isFetchingError = useSelector((state: AppStateType) => state.masterList.itemError);
    const error = useSelector((state: AppStateType) => state.masterList.error);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditMpdal] = useState(false);
    const [master, setMaster] = useState(currentMaster);
    const history: any = useHistory();

    useEffect(() => {
        dispatch(getMasterProfile(id));
        console.log(currentMaster);
    }, []);

    // Окрыть модальное окно удаления
    const openDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenDeleteModal(true);
    };

    // Закрыть модальное окно удаления
    const closeDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenDeleteModal(false);
    };

    // Открыть модальное окно редактирования
    const openEditModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setMaster(currentMaster);
        setIsOpenEditMpdal(true);
    };

    // Закрыть модальное окно редактирования
    const closeEditModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setMasterError(null));
        setIsOpenEditMpdal(false);
    };

    // Обработчик инпутов
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMasterError(null));
        setMaster({
            ...master,
            [e.target.id]: e.target.value,
        });
    };

    // Обработчик селекта
    const selectSpecialisationChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setMasterError(null));
        setMaster({
            ...master,
            specialisation_id: +e.target.value,
        });
    };

    // Применить изменения
    const saveChangesHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const updatedMaster: IMaster = {
            id: currentMaster.id,
            firstname: master.firstname,
            lastname: master.lastname,
            middlename: master.middlename,
            login: master.login,
            name: '',
            specialisation_id: master.specialisation_id,
        };

        console.log(updatedMaster);

        dispatch(updateMaster(updatedMaster));
    };

    // Удалить мастера
    const deleteMasterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteMaster(id, history));
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isFetchingError) {
        return <p>{isFetchingError}</p>;
    }

    if (currentMaster) {
        return (
            <Block>
                <BlockHeader header={`Профиль мастера ${currentMaster.login}`} />
                <BlockBody>
                    <div className="master-profile__field-content">
                        <div className="master-profile__field-content__title">Логин</div>
                        <div className="master-profile__field-content__value">
                            {currentMaster.login}
                        </div>
                    </div>
                    <div className="master-profile__field-content">
                        <div className="master-profile__field-content__title">Имя</div>
                        <div>{currentMaster.firstname}</div>
                    </div>
                    <div className="master-profile__field-content">
                        <div className="master-profile__field-content__title">Фамилия</div>
                        <div>{currentMaster.lastname}</div>
                    </div>
                    <div className="master-profile__field-content">
                        <div className="master-profile__field-content__title">Отчество</div>
                        <div>{currentMaster.middlename ? currentMaster.middlename : '-'}</div>
                    </div>
                    <div className="master-profile__field-content">
                        <div className="master-profile__field-content__title">Специализация</div>
                        <div>{currentMaster.name}</div>
                    </div>
                    <div className="modal__content__actions">
                        <button
                            className="modal__content__actions__buttons"
                            onClick={openEditModalHandler}>
                            Редактировать
                        </button>
                        <button
                            className="modal__content__actions__buttons"
                            onClick={openDeleteModalHandler}>
                            Удалить
                        </button>
                    </div>
                </BlockBody>
                {isOpenEditModal && (
                    <MastersModal
                        isEdit={true}
                        header="Редактирование мастера"
                        error={error ? error : null}
                        master={master}
                        specialisations={specialisations}
                        selectedSpec={master.specialisation_id}
                        onCloseModal={closeEditModalHandler}
                        changeHandler={changeHandler}
                        onSelectSpecialisationChange={selectSpecialisationChangeHandler}
                        actionClick={saveChangesHandler}
                    />
                )}

                {isOpenDeleteModal && (
                    <DeleteModal
                        header={`Удаление ${currentMaster.login}`}
                        title={`мастера "${currentMaster.login}"`}
                        error=""
                        onCloseModalClick={closeDeleteModalHandler}
                        onDeleteClick={deleteMasterHandler}
                    />
                )}
            </Block>
        );
    }
    return null;
    // return history.push('/masters');
};

export default MasterProfile;
