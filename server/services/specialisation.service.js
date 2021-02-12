import * as specialisationRepository from '../repositories/specialisation.repository';
import { getMastersBySpecialisation } from './master.service';

// Получить специализации
export const getSpecialisations = async () => {
    const specialisations = await specialisationRepository.getSpecialisations();
    return specialisations;
};

// Получить одну специализацию по id
export const getOneSpecialisation = async (id) => {
    const [specialisation, masters] = await Promise.all([
        specialisationRepository.getOneSpecialisation(id),
        getMastersBySpecialisation(id),
    ]);
    return { ...specialisation, masters };
};

// Обновить специализацию
export const updateSpecialisation = async (id, name) => {
    const specialisation = await specialisationRepository.updateSpecialisation(id, name);
    return specialisation;
};

// Добавить специализацию
export const createSpecialisation = async (requestBody) => {
    const { name } = requestBody;
    const newSpecialisation = await specialisationRepository.createSpecialisation(name);
    return newSpecialisation;
};

// Удалить специализацию
export const deleteSpecialisation = async (id) => {
    const result = await specialisationRepository.deleteSpecialisation(id);
    if (result === 400) {
        return 400;
    } else {
        return result;
    }
};
