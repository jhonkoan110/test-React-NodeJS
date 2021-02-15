import React from 'react';
import './BlockBody.css';

const BlockBody: React.FC = ({ children }) => {
    return <div className="block__body">{children}</div>;
};

export default BlockBody;
