import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Block from '../../components/Block/Block';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import { IMaster } from '../../redux/masters/reducer';
import { AppStateType } from '../../redux/store';
import { createMaster, getMasters } from '../../service/masters';
import MastersModal from './MastersModal/MastersModal';
import './MastersPage.css';
import MastersTable from './MastersTable/MastersTable';

const MastersPage: React.FC = () => {
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
    const masters = useSelector((state: AppStateType) => state.masterList.masters);
    const { isLoading, hasErrored } = useSelector((state: AppStateType) => state.masterList);
    const specialisations = useSelector(
        (state: AppStateType) => state.specialisationList.specialisations,
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
        dispatch(getMasters());
        // eslint-disable-next-line
    }, []);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaster({
            ...master,
            [e.target.id]: e.target.value,
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

    // Открыть модальное окно
    const openModalClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsActiveModal(true);
    };

    // Закрыть модальное окно
    const closeModalHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsActiveModal(false);
        clearMaster();
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

        clearMaster();

        dispatch(createMaster(newMaster));
    };

    if (isLoading) {
        return <Loader />;
    }

    if (hasErrored) {
        return <Error />;
    }

    return (
        <Block>
            <div className="masters__header">
                <h2>Мастера</h2>
                <button className="masters__add-button" onClick={openModalClickHandler}>
                    Добавить мастера
                </button>
            </div>

            {isActiveModal && (
                <MastersModal
                    master={master}
                    selectedSpec={selectedSpec}
                    specialisations={specialisations}
                    onCloseModal={closeModalHandler}
                    changeHandler={changeHandler}
                    onDropdownSpecClick={selectSpecialisationClickHandler}
                    onAddMasterClick={addMasterClickHandler}
                />
            )}

            <div className="masters__body">
                <MastersTable currentMasters={currentMasters} />
                <Pagination
                    page={currentPage}
                    color="primary"
                    count={mastersCount}
                    shape="rounded"
                    onChange={onPageNumberClickHandler}
                />
            </div>
        </Block>
    );
};

export default MastersPage;
