import Router from 'express';
import * as masterService from '../services/master.service';

const masterRouter = new Router();

// Получить всех мастеров
masterRouter.get('/', async (req, res) => {
    const masters = await masterService.getMasters();
    res.status(200).json(masters);
});

// Получить одного мастера по id
masterRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const master = await masterService.getOneMaster(id);
    res.status(200).json(master);
});

// Получить мастеров по id специализации
masterRouter.get('/:specialisation_id', async (req, res) => {
    const specialisation_id = req.params.specialisation_id;
    const masters = await masterService.getMastersBySpecialisation(specialisation_id);
    req.status(200).json(masters);
});

// Добавить мастера
masterRouter.post('/', async (req, res) => {
    const requestBody = req.body;
    const newMaster = await masterService.createMaster(requestBody);
    res.status(200).json(newMaster);
});

// Обновить мастера
masterRouter.put('/', async (req, res) => {
    const requestBody = req.body;
    const updatedMaster = await masterService.updateMaster(requestBody);
    res.status(200).json(updatedMaster);
});

// Удалить мастера
masterRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const master = await masterService.deleteMaster(id);
    res.status(200).json(master);
});

export default masterRouter;
