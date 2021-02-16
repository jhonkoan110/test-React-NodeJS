import React from 'react';
import Modal from '../../../components/Modal/Modal';
import { ISpecialisation } from '../../../redux/specialisations/reducer';

interface SpecialisationsModalProps {
    isEdit: boolean;
    error: null | string;
    header: string;
    specisalisation: ISpecialisation;
    onCloseModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    actionClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SpecialisationsModal: React.FC<SpecialisationsModalProps> = ({
    isEdit,
    error,
    header,
    specisalisation,
    onCloseModal,
    changeHandler,
    actionClick,
}) => {
    return (
        <Modal header={header} onCloseModalClick={onCloseModal}>
            <input
                type="text"
                className={error ? 'modal__content__input__error' : 'modal__content__input'}
                placeholder="Введите название специализации"
                value={specisalisation.name}
                onChange={changeHandler}
            />
            {error && <p className="modal__content__error">{error}</p>}

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

export default SpecialisationsModal;
