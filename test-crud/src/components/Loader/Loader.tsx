import React from 'react';
import Block from '../Block/Block';
import loader from '../../assets/loader.gif';
import './Loader.css';

const Loader: React.FC = () => {
    return (
        <Block>
            <div className="masters__header">
                <img className="loader" src={loader} alt="preloader" />
            </div>
        </Block>
    );
};

export default Loader;
