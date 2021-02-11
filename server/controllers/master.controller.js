import Router from 'express';
import {
    createMaster2,
    getMasters2,
    getMastersBySpecialisation2,
    updateMaster2,
    deleteMaster2,
} from '../services/master.service';

const masterRouter = new Router();

masterRouter.post('/', createMaster2);

masterRouter.get('/', getMasters2);

masterRouter.get('/', getMastersBySpecialisation2);

masterRouter.put('/', updateMaster2);

masterRouter.delete('/:id', deleteMaster2);

export default masterRouter;
