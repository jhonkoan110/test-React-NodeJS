import React from 'react';

interface InputProps {
    inputId: string;
    value: string;
    isReadonly: boolean;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ inputId, value, isReadonly, changeHandler }) => {
    return (
        <input
            id={inputId}
            className="tbody__row__item"
            type="text"
            value={value}
            readOnly={isReadonly}
            onChange={changeHandler}
        />
    );
};

export default Input;
