import React from 'react';
import './BlockHeader.css';

interface BlockHeaderProps {
    header: string;
    buttonText?: string;
    onOpenModalClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BlockHeader: React.FC<BlockHeaderProps> = ({ header, buttonText, onOpenModalClick }) => {
    return (
        <div className="block__header">
            <h2>{header}</h2>
            {buttonText && (
                <button className="block__add-button" onClick={onOpenModalClick}>
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default BlockHeader;
