import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IMaster } from '../../../../redux/masters/reducer';
import { deleteMasterFetch } from '../../../../service/masters';
import './Tbody.css';
import TbodyRow from './TbodyRow';

interface TbodyProps {
    currentMasters: Array<IMaster>;
}

const Tbody: React.FC<TbodyProps> = ({ currentMasters }) => {
    const dispatch = useDispatch();

    // Удалить мастера по id
    const deleteMasterHandler = (id: number) => {
        dispatch(deleteMasterFetch(id));
    };

    return (
        <tbody className="tbody">
            {currentMasters.map((item: IMaster) => {
                return <TbodyRow key={item.id} item={item} onDeleteClick={deleteMasterHandler} />;
            })}
        </tbody>
    );
};

export default Tbody;
