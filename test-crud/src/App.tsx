import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import MasterProfile from './Pages/Masters/MasterProfile/MasterProfile';
import MastersPage from './Pages/Masters/MastersPage/MastersPage';
import SpecialisationInfo from './Pages/Specialisations/SpecialisationInfo/SpecialisationInfo';
import SpecialisationsPage from './Pages/Specialisations/SpecialisationsPage/SpecialisationsPage';

const App: React.FC = () => {
    return (
        <div className="app">
            <Header />
            <Switch>
                <Route path="/masters/">
                    <MastersPage />
                </Route>
                <Route path="/specialisations">
                    {' '}
                    <SpecialisationsPage />
                </Route>
                <Route path="/profile/:id">
                    <MasterProfile />
                </Route>
                <Route path="/specialisation_info/:id">
                    <SpecialisationInfo />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
