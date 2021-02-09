import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import MastersPage from '../../Pages/Masters/MastersPage';
import SpecialisationsPage from '../../Pages/Specialisations/SpecialisationsPage';
import './Main.css';

const Main: React.FC = () => {
    return (
        <main className="main">
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
            <Switch>
                <Route path="/masters">
                    <MastersPage />
                </Route>
                <Route path="/specialisations">
                    <SpecialisationsPage />
                </Route>
            </Switch>
        </main>
    );
};

export default Main;
