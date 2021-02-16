import React from 'react';
import Block from '../Block/Block';
import BlockBody from '../BlockBody/BlockBody';
import BlockHeader from '../BlockHeader/BlockHeader';
import './Error.css';

interface ErrorProps {
    message: string | null;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return (
        <Block>
            <BlockHeader header="Ошибка" />

            <BlockBody>
                <p className="error__message">{message}</p>
            </BlockBody>
            <div className="masters__body"></div>
        </Block>
    );
};

export default Error;
