import { Router } from 'express';
import * as specialisationService from '../services/specialisation.service';
import {
    NotFoundError,
    DeleteSpecialisationError,
} from '../repositories/specialisation.repository';

const specialisationRouter = new Router();

// Получить специализации
specialisationRouter.get('/', async (req, res) => {
    try {
        const specialisations = await specialisationService.getSpecialisations();
        res.status(200).json(specialisations);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Получить одну специализацию по id
specialisationRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const specialisation = await specialisationService.getOneSpecialisation(id);
        res.status(200).json(specialisation);
    } catch (err) {
        if (err instanceof NotFoundError) {
            res.status(404).json(err.message);
        } else {
            res.status(500).json(err);
        }
    }
});

// Добавить специализацию
specialisationRouter.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const newSpecialisation = await specialisationService.createSpecialisation(name);
        res.status(200).json(newSpecialisation);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Обновить специализацию
specialisationRouter.put('/', async (req, res) => {
    try {
        const { id, name } = req.body;
        const specialisation = specialisationService.updateSpecialisation(id, name);
        res.status(200).json(specialisation);
    } catch (error) {
        if (error instanceof NotFoundError) {
            console.log(error.message);
            res.status(404).json(error.message);
        } else {
            console.log(error);
            res.status(500).json(error);
        }
    }
});

// Удалить специализацию
specialisationRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await specialisationService.deleteSpecialisation(id);
        res.status(200).json(result);
    } catch (err) {
        if (err instanceof NotFoundError) {
            res.status(404).json(err.message);
        } else if (err instanceof DeleteSpecialisationError) {
            res.status(400).json(err.message);
        } else {
            res.status(500).json(err);
        }
    }
});

export default specialisationRouter;
