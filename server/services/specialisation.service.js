import * as specialisationRepository from '../repositories/specialisation.repository';

// Получить специализации
export const getSpecialisations = async () => {
    const specialisations = await specialisationRepository.getSpecialisations();
    return specialisations;
};

// Получить одну специлизацию по id
export const getOneSpecialisation = async (id) => {
    const specialisation = await specialisationRepository.getOneSpecialisation(id);
    return specialisation;
};

// Обновить специализацию
export const updateSpecialisation = async (id, name) => {
    const specialisation = await specialisationRepository.updateSpecialisation(id, name);
    return specialisation;
};

// Добавить специализацию
export const createSpecialisation = async (name) => {
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
