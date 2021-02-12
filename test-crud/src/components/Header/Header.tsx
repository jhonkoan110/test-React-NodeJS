import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__inner">
                <h2>Test Crud UI NodeJS</h2>
                <div className="pages">
                    <div className="masters-page">
                        <NavLink to="/masters" activeClassName="active">
                            Мастера
                        </NavLink>
                    </div>
                    <div className="specialisations-page">
                        <NavLink to="/specialisations" activeClassName="active">
                            Специализации
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
