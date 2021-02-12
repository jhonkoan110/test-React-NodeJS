import React from 'react';

interface InputProps {
    inputId: string;
    value: string;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ inputId, value, changeHandler }) => {
    return (
        <input
            id={inputId}
            className="tbody__row__item"
            type="text"
            value={value}
            onChange={changeHandler}
        />
    );
};

export default Input;
