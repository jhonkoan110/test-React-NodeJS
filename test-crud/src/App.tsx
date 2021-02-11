import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import MastersPage from './Pages/Masters/MastersPage';
import Profile from './Pages/Profile/Profile';
import SpecialisationsPage from './Pages/Specialisations/SpecialisationsPage';

const App: React.FC = () => {
    return (
        <div className="app">
            <Header />
            <Switch>
                <Route path="/masters">
                    <MastersPage />
                </Route>
                <Route path="/specialisations">
                    <SpecialisationsPage />
                </Route>
                <Route path="/profile/:id">
                    <Profile />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
