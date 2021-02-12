import Router from 'express';
import { NotFoundError } from '../repositories/specialisation.repository';
import * as masterService from '../services/master.service';
import { validateMaster } from '../services/validate.service';

const masterRouter = new Router();

// Получить всех мастеров
masterRouter.get('/', async (req, res) => {
    try {
        const masters = await masterService.getMasters();
        res.status(200).json(masters);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Получить одного мастера по id
masterRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const master = await masterService.getOneMaster(id);
        res.status(200).json(master);
    } catch (err) {
        if (err instanceof NotFound) {
            res.status(404).json(err.message);
        } else {
            res.status(500).json(err);
        }
    }
});

// Получить мастеров по id специализации
masterRouter.get('/', async (req, res) => {
    try {
        const specialisation_id = req.body.specialisation_id;
        const masters = await masterService.getMastersBySpecialisation(specialisation_id);
        res.status(200).json(masters);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Добавить мастера
masterRouter.post('/', async (req, res) => {
    try {
        // Валидация данных
        const validationResult = await validateMaster(req.body);
        console.log(validationResult);
        if (validationResult.error === true) {
            res.status(400).json(validationResult);
        } else {
            const requestBody = req.body;
            const newMaster = await masterService.createMaster(requestBody);
            res.status(200).json(newMaster);
        }
    } catch (err) {
        if (err instanceof NotFoundError) {
            res.status(404).json(err.message);
        }
        res.status(500).json(err);
    }
});

// Обновить мастера
masterRouter.put('/', async (req, res) => {
    try {
        const requestBody = req.body;
        const updatedMaster = await masterService.updateMaster(requestBody);
        res.status(200).json(updatedMaster);
    } catch (err) {
        if (err instanceof NotFoundError) {
            res.status(404).json(err.message);
        } else {
            res.status(500).json(err);
        }
    }
});

// Удалить мастера
masterRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const master = await masterService.deleteMaster(id);
        res.status(200).json(master);
    } catch (err) {
        if (err instanceof NotFound) {
            res.status(404).json(err.message);
        } else {
            res.status(500).json(err);
        }
    }
});

export default masterRouter;
