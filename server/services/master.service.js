import * as masterRepository from '../repositories/master.repository';
import { getOneSpecialisation } from './specialisation.service';

// Получить всех мастеров
export const getMasters = async () => {
    const masters = await masterRepository.getMasters();
    return masters;
};

// Получить одного мастера по Id
export const getOneMaster = async (id) => {
    const master = await masterRepository.getOneMaster(id);
    const specialisation = await getOneSpecialisation(master.specialisation_id);
    return { ...master, name: specialisation.name };
};

// Получить мастеров по id специализации
export const getMastersBySpecialisation = async (specialisation_id) => {
    const masters = await masterRepository.getMastersBySpecialisation(specialisation_id);
    return masters;
};

// Создать мастера
export const createMaster = async (requestBody) => {
    const newMaster = await masterRepository.createMaster(requestBody);
    return newMaster;
};

// Обновить мастера
export const updateMaster = async (requestBody) => {
    const updatedMaster = await masterRepository.updateMaster(requestBody);
    return updatedMaster;
};

// Удалить мастера по id
export const deleteMaster = async (id) => {
    const master = await masterRepository.deleteMaster(id);
    return master;
};
