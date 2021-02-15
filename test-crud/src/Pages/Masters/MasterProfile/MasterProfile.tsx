import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Block from '../../../components/Block/Block';
import BlockBody from '../../../components/BlockBody/BlockBody';
import BlockHeader from '../../../components/BlockHeader/BlockHeader';
import Loader from '../../../components/Loader/Loader';
import DeleteModal from '../../../components/Modal/DeleteModal/DeleteModal';
import { AppStateType } from '../../../redux/store';
import { deleteMaster, getMasterProfile } from '../../../service/masters';
import './MasterProfile.css';

interface MasterProfileProps {}

const MasterProfile: React.FC = () => {
    const { id }: any = useParams();
    const dispatch = useDispatch();
    const currentMaster = useSelector((state: AppStateType) => state.masterList.currentMaster);
    const isLoading = useSelector((state: AppStateType) => state.masterList.isItemLoading);
    const error = useSelector((state: AppStateType) => state.masterList.itemError);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(getMasterProfile(id));
    }, []);

    // Окрыть модальное окно удаления
    const openDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenDeleteModal(true);
    };

    // Закрыть модальное окно удаления
    const closeDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenDeleteModal(false);
    };

    // Удалить мастера
    const deleteMasterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteMaster(id));
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p>{error}</p>;
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
                        <div>{currentMaster.middlename}</div>
                    </div>
                    <div className="master-profile__field-content">
                        <div className="master-profile__field-content__title">Специализация</div>
                        <div>{currentMaster.name}</div>
                    </div>
                    <div className="modal__content__actions">
                        <button className="modal__content__actions__buttons">Редактировать</button>
                        <button
                            className="modal__content__actions__buttons"
                            onClick={openDeleteModalHandler}>
                            Удалить
                        </button>
                    </div>
                </BlockBody>
                {isOpenDeleteModal && (
                    <DeleteModal
                        header={`Удаление ${currentMaster.login}`}
                        title={`мастера "${currentMaster.login}"`}
                        onCloseModalClick={closeDeleteModalHandler}
                        onDeleteClick={deleteMasterHandler}
                    />
                )}
            </Block>
        );
    }
    return null;
};

export default MasterProfile;
