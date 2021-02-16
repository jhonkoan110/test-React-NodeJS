import React, { ChangeEvent } from 'react';
import Modal from '../../../components/Modal/Modal';
import { IMasterError } from '../../../redux/masters/reducer';
import { ISpecialisation } from '../../../redux/specialisations/reducer';
import './MastersModal.css';

interface MastersModalProps {
    isEdit: boolean;
    header: string;
    error: null | IMasterError;
    master?: any;
    selectedSpec?: string;
    specialisations: Array<ISpecialisation>;
    onCloseModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectSpecialisationChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onOptionClick?: (id: number) => void;
    actionClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MastersModal: React.FC<MastersModalProps> = ({
    isEdit,
    header,
    error,
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
                className={error?.login ? 'modal__content__input__error' : 'modal__content__input'}
                type="text"
                placeholder="Введите логин мастера"
                value={master.login}
                onChange={changeHandler}
            />
            {error && <p className="modal__content__error">{error.login}</p>}

            <input
                id="lastname"
                className={
                    error?.lastname ? 'modal__content__input__error' : 'modal__content__input'
                }
                type="text"
                placeholder="Введите фамилию мастера"
                value={master.lastname}
                onChange={changeHandler}
            />
            {error && <p className="modal__content__error">{error.lastname}</p>}
            <input
                id="firstname"
                className={
                    error?.firstname ? 'modal__content__input__error' : 'modal__content__input'
                }
                type="text"
                placeholder="Введите имя мастера"
                value={master.firstname}
                onChange={changeHandler}
            />
            {error && <p className="modal__content__error">{error.firstname}</p>}
            <input
                id="middlename"
                className={
                    error?.middlename ? 'modal__content__input__error' : 'modal__content__input'
                }
                type="text"
                placeholder="Введите отчество мастера"
                value={master.middlename}
                onChange={changeHandler}
            />
            {error && <p className="modal__content__error">{error.middlename}</p>}
            <select
                className={
                    error?.specialisation
                        ? 'specialisations__select__error'
                        : 'specialisations__select'
                }
                onChange={onSelectSpecialisationChange}>
                {specialisations.map((item: ISpecialisation) => {
                    return (
                        <option value={item.id} key={item.id}>
                            {item.name}
                        </option>
                    );
                })}
            </select>
            {error && <p className="modal__content__error">{error.specialisation}</p>}

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
