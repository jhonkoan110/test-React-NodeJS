import React from 'react';
import './Block.css';

interface BlockProps {}

const Block: React.FC<BlockProps> = ({ children }) => {
    return <div className="block">{children}</div>;
};

export default Block;
