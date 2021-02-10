import React from 'react';
import Dropdown from '../../../components/Dropdown/Dropdown';
import Modal from '../../../components/Modal/Modal';
import { ISpecialisation } from '../../../redux/specialisations/reducer';

interface MastersModalProps {
    master: any;
    selectedSpec: string;
    specialisations: Array<ISpecialisation>;
    onCloseModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDropdownSpecClick: (id: number, specialisationName: string) => void;
    onAddMasterClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MastersModal: React.FC<MastersModalProps> = ({
    master,
    selectedSpec,
    specialisations,
    onCloseModal,
    changeHandler,
    onDropdownSpecClick,
    onAddMasterClick,
}) => {
    return (
        <Modal header="мастера" onCloseModalClick={onCloseModal}>
            <input
                id="login"
                className="modal__content__input"
                type="text"
                placeholder="Введите логин мастера"
                value={master.login}
                onChange={changeHandler}
            />
            <input
                id="firstname"
                className="modal__content__input"
                type="text"
                placeholder="Введите имя мастера"
                value={master.firstname}
                onChange={changeHandler}
            />
            <input
                id="lastname"
                className="modal__content__input"
                type="text"
                placeholder="Введите фамилию мастера"
                value={master.lastname}
                onChange={changeHandler}
            />
            <input
                id="middlename"
                className="modal__content__input"
                type="text"
                placeholder="Введите отчество мастера"
                value={master.middlename}
                onChange={changeHandler}
            />
            <Dropdown
                selectedSpec={selectedSpec}
                specialisations={specialisations}
                onSpecClick={onDropdownSpecClick}
            />

            <div className="modal__content__actions">
                <button className="modal__content__actions__buttons" onClick={onAddMasterClick}>
                    Добавить
                </button>
                <button className="modal__content__actions__buttons" onClick={onCloseModal}>
                    Закрыть
                </button>
            </div>
        </Modal>
    );
};

export default MastersModal;
