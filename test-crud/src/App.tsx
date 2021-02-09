import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import MastersPage from './Pages/Masters/MastersPage';
import SpecialisationsPage from './Pages/Specialisations/SpecialisationsPage';

const App: React.FC = () => {
    return (
        <div className="app">
            <Header />
            <Main />
        </div>
    );
};

export default App;
