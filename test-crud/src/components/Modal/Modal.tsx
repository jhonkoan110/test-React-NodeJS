import React from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

interface ModalProps {
    header: string;
    onCloseModalClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Modal: React.FC<ModalProps> = ({ header, onCloseModalClick, children }) => {
    return createPortal(
        <div className="modal">
            <div className="modal__content">
                <button className="modal__close-btn" onClick={onCloseModalClick}>
                    x
                </button>
                <h2 className="modal__header">{header}</h2>
                <div className="modal__content__body">{children}</div>
            </div>
        </div>,
        document.getElementById('portal')!,
    );
};

export default Modal;
