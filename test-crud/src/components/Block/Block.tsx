import React from 'react';
import './Block.css';

const Block: React.FC = ({ children }) => {
    return <div className="block">{children}</div>;
};

export default Block;
