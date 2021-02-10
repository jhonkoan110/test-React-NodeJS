import { Router } from 'express';
import {
    createSpecialisation2,
    deleteSpecialisation2,
    getOneSpecialisation2,
    getSpecialisations2,
    updateSpecialisation2,
} from '../service/specialisation.service';

const specialisationRouter = new Router();

specialisationRouter.post('/', createSpecialisation2);

specialisationRouter.get('/', getSpecialisations2);

specialisationRouter.get('/:id', getOneSpecialisation2);

specialisationRouter.put('/', updateSpecialisation2);

specialisationRouter.delete('/:id', deleteSpecialisation2);

export default specialisationRouter;
