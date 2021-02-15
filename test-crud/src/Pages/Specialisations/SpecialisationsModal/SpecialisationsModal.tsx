import React from 'react';
import Modal from '../../../components/Modal/Modal';
import { ISpecialisation } from '../../../redux/specialisations/reducer';

interface SpecialisationsModalProps {
    isEdit: boolean;
    header: string;
    specisalisation: ISpecialisation;
    onCloseModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    actionClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SpecialisationsModal: React.FC<SpecialisationsModalProps> = ({
    isEdit,
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
                className="modal__content__input"
                placeholder="Введите название специализации"
                value={specisalisation.name}
                onChange={changeHandler}
            />

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
