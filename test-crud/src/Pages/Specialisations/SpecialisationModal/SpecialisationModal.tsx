import React from 'react';
import Modal from '../../../components/Modal/Modal';

interface SpecialisationModalProps {
    specialisationName: string;
    closeModalHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onChangeModalInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddSpecialisationClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SpecialisationModal: React.FC<SpecialisationModalProps> = ({
    specialisationName,
    closeModalHandler,
    onChangeModalInput,
    onAddSpecialisationClick,
}) => {
    return (
        <Modal header="Добавить специализацию" onCloseModalClick={closeModalHandler}>
            <input
                className="modal__content__input"
                type="text"
                placeholder="Введите имя специализации"
                value={specialisationName}
                onChange={onChangeModalInput}
            />

            <div className="modal__content__actions">
                <button
                    className="modal__content__actions__buttons"
                    onClick={onAddSpecialisationClick}>
                    Добавить
                </button>
                <button className="modal__content__actions__buttons" onClick={closeModalHandler}>
                    Закрыть
                </button>
            </div>
        </Modal>
    );
};

export default SpecialisationModal;
