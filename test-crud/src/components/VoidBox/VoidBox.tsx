import React from 'react';
import Block from '../Block/Block';
import BlockBody from '../BlockBody/BlockBody';
import BlockHeader from '../BlockHeader/BlockHeader';
import './VoidBox.css';

interface VoidBoxProps {
    text: string;
    header: string;
    headerButtonText: string;
    onOpenModalClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const VoidBox: React.FC<VoidBoxProps> = ({ text, header, headerButtonText, onOpenModalClick }) => {
    return (
        <Block>
            <BlockHeader
                header={header}
                buttonText={headerButtonText}
                onOpenModalClick={onOpenModalClick}
            />
            <BlockBody>
                <div className="voidbox__text">{text}</div>
            </BlockBody>
        </Block>
    );
};

export default VoidBox;
