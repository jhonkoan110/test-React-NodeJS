import { Pagination } from '@material-ui/lab';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Block from '../../../components/Block/Block';
import BlockBody from '../../../components/BlockBody/BlockBody';
import BlockHeader from '../../../components/BlockHeader/BlockHeader';
import Error from '../../../components/Error/Error';
import Loader from '../../../components/Loader/Loader';
import { setMasterError } from '../../../redux/masters/actionCreators';
import { IMaster } from '../../../redux/masters/reducer';
import { AppStateType } from '../../../redux/store';
import { createMaster, getMastersList } from '../../../service/masters';
import MastersModal from '../MastersModal/MastersModal';
import MastersList from '../MastersTable/MastersList';

const MastersPage: React.FC = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: AppStateType) => state.masterList.isListLoading);
    const isFetchingError = useSelector((state: AppStateType) => state.masterList.listError);
    const error = useSelector((state: AppStateType) => state.masterList.error);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const masters = useSelector((state: AppStateType) => state.masterList.masters);
    const specialisations = useSelector(
        (state: AppStateType) => state.specialisationsList.specialisations,
    );
    const [master, setMaster] = useState({
        login: '',
        firstname: '',
        lastname: '',
        middlename: '',
        specialisation_id: 0,
    });

    // Пагинация
    const [currentPage, setCurrentPage] = useState(1);
    const mastersPerPage: number = 5;

    const indexOfLastMaster: number = currentPage * mastersPerPage;
    const indexOfFirstMaster: number = indexOfLastMaster - mastersPerPage;
    const currentMasters: Array<IMaster> = masters.slice(indexOfFirstMaster, indexOfLastMaster);
    const mastersCount = Math.ceil(masters.length / mastersPerPage);

    const onPageNumberClickHandler = (e: any, pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getMastersList());
    }, []);

    // Открыть модальное окно
    const openModalClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsOpenModal(true);
    };

    // Закрыть модальное окно
    const closeModalHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(setMasterError(null));
        setIsOpenModal(false);
        // clearMaster();
    };

    // Обработка инпутов модального окна
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMasterError(null));
        setMaster({
            ...master,
            [e.target.id]: e.target.value,
        });
    };

    // Обработчик селекта
    const selectSpecialisationHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setMasterError(null));
        setMaster({
            ...master,
            specialisation_id: +e.target.value,
        });
    };

    const clearMaster = () => {
        setMaster({
            login: '',
            firstname: '',
            lastname: '',
            middlename: '',
            specialisation_id: 0,
        });
    };

    // Добавление нового мастера
    const addMasterHandler = () => {
        const newMaster: IMaster = {
            id: 0,
            login: master.login,
            firstname: master.firstname,
            lastname: master.lastname,
            middlename: master.middlename,
            name: '',
            specialisation_id: master.specialisation_id,
        };
        console.log(newMaster);

        dispatch(createMaster(newMaster));

        clearMaster();
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isFetchingError !== null) {
        return <Error message={isFetchingError} />;
    }

    return (
        <Block>
            <BlockHeader
                header="Мастера"
                buttonText="Добавить мастера"
                onOpenModalClick={openModalClickHandler}
            />

            <BlockBody>
                <MastersList currentMasters={currentMasters} />
                <Pagination
                    page={currentPage}
                    color="primary"
                    count={mastersCount}
                    shape="rounded"
                    onChange={onPageNumberClickHandler}
                />

                {isOpenModal && (
                    <MastersModal
                        header="Добавить мастера"
                        error={error ? error : null}
                        master={master}
                        specialisations={specialisations}
                        isEdit={false}
                        // selectedSpec={selectedSpec}
                        onCloseModal={closeModalHandler}
                        changeHandler={changeHandler}
                        actionClick={addMasterHandler}
                        onSelectSpecialisationChange={selectSpecialisationHandler}
                    />
                )}
            </BlockBody>
        </Block>
    );
};

export default MastersPage;
