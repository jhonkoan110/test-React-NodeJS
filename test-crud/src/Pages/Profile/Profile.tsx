import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Block from '../../components/Block/Block';
import Loader from '../../components/Loader/Loader';
import DeleteModal from '../../components/Modal/DeleteModal/DeleteModal';
import { IMaster } from '../../redux/masters/reducer';
import { AppStateType } from '../../redux/store';
import { deleteMasterFetch } from '../../service/masters';
import { getMasterProfile, updateMasterProfile } from '../../service/profile';
import MastersModal from '../Masters/MastersModal/MastersModal';
import './Profile.css';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
    const { id }: any = useParams();
    const dispatch = useDispatch();
    const currentMaster: IMaster = useSelector(
        (state: AppStateType) => state.profile.currentProfile,
    );
    const [master, setMaster] = useState(currentMaster);
    const isLoading: boolean = useSelector((state: AppStateType) => state.profile.isLoading);
    const [isActiveModal, setIsActiveModal] = useState(false);
    const [isActiveDeleteModal, setIsActiveDeleteModal] = useState(false);
    const [selectedSpec, setSelectedSpec] = useState(currentMaster.name);
    const specialisations = useSelector(
        (state: AppStateType) => state.specialisationList.specialisations,
    );

    // Получение мастера по id
    useEffect(() => {
        dispatch(getMasterProfile(id));
    }, []);

    // Открыть модальное окно редактирования
    const editButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setMaster(currentMaster);
        setSelectedSpec(currentMaster.name);
        setIsActiveModal(true);
    };

    // Закрыть модальное окно редактирования
    const closeModalHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsActiveModal(false);
    };

    // Открыть модальное окно удаления
    const deleteButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setMaster(currentMaster);
        setIsActiveDeleteModal(true);
    };

    // Закрыть модальное окно  удаления
    const closeDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsActiveDeleteModal(false);
    };

    //Обоработка инпутов
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaster({
            ...master,
            [e.target.id]: e.target.value,
        });
    };

    // Выбрать специализацию
    const selectSpecialisationHandler = (id: number, specialisationName: string) => {
        setSelectedSpec(specialisationName);
        setMaster({
            ...master,
            specialisation_id: id,
        });
    };

    // Удалить мастера
    const deleteMasterClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(deleteMasterFetch(currentMaster.id));
    };

    // Применить изменения
    const saveUpdatedChangesHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const updatedMaster: IMaster = {
            id: currentMaster.id,
            login: master.login,
            firstname: master.firstname,
            lastname: master.lastname,
            middlename: master.middlename,
            name: selectedSpec,
            specialisation_id: master.specialisation_id,
        };

        dispatch(updateMasterProfile(updatedMaster));
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Block>
            <div className="profile__header">
                <h2>Мастер {currentMaster.login}</h2>
            </div>
            <fieldset>
                <legend>Логин</legend>
                <p className="profile__data">{currentMaster.login}</p>
            </fieldset>
            <fieldset>
                <legend>Фамилия</legend>
                <p className="profile__data">{currentMaster.lastname}</p>
            </fieldset>
            <fieldset>
                <legend>Имя</legend>
                <p className="profile__data">{currentMaster.firstname}</p>
            </fieldset>
            <fieldset>
                <legend>Отчество</legend>
                <p className="profile__data">{currentMaster.middlename}</p>
            </fieldset>
            <fieldset>
                <legend>Специализация</legend>
                <p className="profile__data">{currentMaster.name}</p>
            </fieldset>
            <div className="modal__content__actions">
                <button
                    className="modal__content__actions__buttons"
                    onClick={editButtonClickHandler}>
                    Редактировать
                </button>
                <button
                    className="modal__content__actions__buttons"
                    onClick={deleteButtonClickHandler}>
                    Удалить
                </button>
            </div>
            {isActiveModal && (
                <MastersModal
                    isEdit={true}
                    header="Редактирование мастера"
                    master={master}
                    specialisations={specialisations}
                    selectedSpec={selectedSpec}
                    onCloseModal={closeModalHandler}
                    changeHandler={changeHandler}
                    actionClick={saveUpdatedChangesHandler}
                    onDropdownSpecClick={selectSpecialisationHandler}
                />
            )}
            {isActiveDeleteModal && (
                <DeleteModal
                    header="Удаление мастера"
                    title={'мастера ' + master.login}
                    onCloseModalClick={closeDeleteModalHandler}
                    onDeleteClick={deleteMasterClickHandler}
                />
            )}
        </Block>
    );
};

export default Profile;
