import React from 'react';
import Block from '../Block/Block';

const Error: React.FC = () => {
    return (
        <Block>
            <div className="masters__header">
                <h2>Ошибка</h2>
            </div>
            <div className="masters__body">
                <p>Во время загрузки произошла ошибка</p>
            </div>
        </Block>
    );
};

export default Error;
