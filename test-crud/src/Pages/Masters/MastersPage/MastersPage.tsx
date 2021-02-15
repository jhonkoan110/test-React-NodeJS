import { Pagination } from '@material-ui/lab';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Block from '../../../components/Block/Block';
import BlockBody from '../../../components/BlockBody/BlockBody';
import BlockHeader from '../../../components/BlockHeader/BlockHeader';
import { IMaster } from '../../../redux/masters/reducer';
import { AppStateType } from '../../../redux/store';
import { createMaster, getMastersList } from '../../../service/masters';
import MastersModal from '../MastersModal/MastersModal';
import MastersList from '../MastersTable/MastersList';

const MastersPage: React.FC = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: AppStateType) => state.masterList.isListLoading);
    const error = useSelector((state: AppStateType) => state.masterList.listError);
    const [selectedSpec, setSelectedSpec] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [master, setMaster] = useState({
        login: '',
        firstname: '',
        lastname: '',
        middlename: '',
        specialisation_id: 0,
    });
    const masters = useSelector((state: AppStateType) => state.masterList.masters);
    const specialisations = useSelector(
        (state: AppStateType) => state.specialisationsList.specialisations,
    );

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
        setIsOpenModal(false);
        // clearMaster();
    };

    // Обработка инпутов модального окна
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaster({
            ...master,
            [e.target.id]: e.target.value,
        });
    };

    // Выбор специализации
    const selectSpecialisationHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedSpec(e.target.value);
    };
    const onOptionClick = (id: number) => {
        // setMaster({
        //     ...master,
        //     specialisation_id: id,
        // });
        console.log('sasdsdsd');
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
            name: selectedSpec,
            specialisation_id: 72,
        };
        console.log(newMaster);

        dispatch(createMaster(newMaster));

        clearMaster();
    };

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
                        master={master}
                        specialisations={specialisations}
                        isEdit={false}
                        selectedSpec={selectedSpec}
                        onCloseModal={closeModalHandler}
                        changeHandler={changeHandler}
                        actionClick={addMasterHandler}
                        onSelectSpecialisationChange={selectSpecialisationHandler}
                        onOptionClick={onOptionClick}
                    />
                )}
            </BlockBody>
        </Block>
    );
};

export default MastersPage;
