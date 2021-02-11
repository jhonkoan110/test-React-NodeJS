import { Router } from 'express';
import * as specialisationService from '../services/specialisation.service';

const specialisationRouter = new Router();

// Получить специализации
specialisationRouter.get('/', async (req, res) => {
    const specialisations = await specialisationService.getSpecialisations();
    res.status(200).json(specialisations);
});

// Получить одну специализацию по id
specialisationRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const specialisation = await specialisationService.getOneSpecialisation(id);
    res.status(200).json(specialisation);
});

// Добавить специализацию
specialisationRouter.post('/', async (req, res) => {
    const { name } = req.body;
    const newSpecialisation = await specialisationService.createSpecialisation(name);
    res.status(200).json(newSpecialisation);
});

// Обновить специализацию
specialisationRouter.put('/', async (req, res) => {
    const { id, name } = req.body;
    const specialisation = specialisationService.updateSpecialisation(id, name);
    res.status(200).json(specialisation);
});

// Удалить специализацию
specialisationRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await specialisationService.deleteSpecialisation(id);
    if (result === 400) {
        res.status(400).json({
            title: `У этой специализации ещё есть мастер(-а)`,
        });
    } else {
        res.status(200).json(result);
    }
});

export default specialisationRouter;
