import React from 'react';
import Modal from '../Modal';
import './DeleteModal.css';

interface DeleteModalProps {
    header: string;
    title: string;
    error: string;
    onCloseModalClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onDeleteClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    header,
    title,
    error,
    onCloseModalClick,
    onDeleteClick,
}) => {
    return (
        <Modal header={header} onCloseModalClick={onCloseModalClick}>
            <div className="delete-modal__text">Вы действительно хотите удалить {title}?</div>
            {error && <div className="delete-modal__text__error">{error}</div>}
            <div className="modal__content__actions">
                <button className="modal__content__actions__buttons" onClick={onDeleteClick}>
                    Да
                </button>

                <button className="modal__content__actions__buttons" onClick={onCloseModalClick}>
                    Отменить
                </button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
