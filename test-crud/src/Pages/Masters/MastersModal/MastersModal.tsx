import React, { ChangeEvent } from 'react';
import Modal from '../../../components/Modal/Modal';
import { ISpecialisation } from '../../../redux/specialisations/reducer';
import './MastersModal.css';

interface MastersModalProps {
    isEdit: boolean;
    header: string;
    master?: any;
    selectedSpec: string;
    specialisations: Array<ISpecialisation>;
    onCloseModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectSpecialisationChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onOptionClick: (id: number) => void;
    actionClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MastersModal: React.FC<MastersModalProps> = ({
    isEdit,
    header,
    master,
    selectedSpec,
    specialisations,
    onCloseModal,
    changeHandler,
    onSelectSpecialisationChange,
    onOptionClick,
    actionClick,
}) => {
    return (
        <Modal header={header} onCloseModalClick={onCloseModal}>
            <input
                id="login"
                className="modal__content__input"
                type="text"
                placeholder="Введите логин мастера"
                value={master.login}
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
                id="firstname"
                className="modal__content__input"
                type="text"
                placeholder="Введите имя мастера"
                value={master.firstname}
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
            <select className="specialisations__select" onChange={onSelectSpecialisationChange}>
                {specialisations.map((item: ISpecialisation) => {
                    return (
                        <option key={item.id} onClick={() => onOptionClick(item.id)}>
                            {item.name}
                        </option>
                    );
                })}
            </select>

            <div className="modal__content__actions">
                <button className="modal__content__actions__buttons" onClick={actionClick}>
                    {isEdit ? 'Сохранить' : 'Добавить'}
                </button>

                <button className="modal__content__actions__buttons" onClick={onCloseModal}>
                    Закрыть
                </button>
            </div>
        </Modal>
    );
};

export default MastersModal;
