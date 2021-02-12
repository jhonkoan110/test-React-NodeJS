import { NotFoundError } from '../repositories/specialisation.repository';
import { getOneSpecialisation } from './specialisation.service';

// Валидация мастера
export const validateMaster = (master) => {
    let result = {
        error: false,
        validationErrors: {
            login: '',
            firstname: '',
            lastname: '',
            middlename: '',
            specialisation: '',
        },
    };

    const { login, firstname, lastname, middlename, specialisation_id } = master;
    const specialisation = getOneSpecialisation(specialisation_id);

    // Проверка логина
    if (login.length === 0 || login.length > 30) {
        result = {
            ...result,
            error: true,
        };
        result.validationErrors.login = 'Обязательное поле. Не более 30 символов.';
    }

    // Проверка имени
    if (firstname.length === 0 || firstname.length > 30) {
        result = {
            ...result,
            error: true,
        };
        result.validationErrors.firstname = 'Обязательное поле. Не более 30 символов.';
    }

    // Проверка фамилии
    if (lastname.length === 0 || lastname.length > 30) {
        result = {
            ...result,
            error: true,
        };
        result.validationErrors.lastname = 'Обязательное поле. Не более 30 символов.';
    }

    // Проверка отчества
    if (middlename.length > 30) {
        result = {
            ...result,
            error: true,
        };
        result.validationErrors.middlename = 'Не более 30 символов.';
    }

    // Проверка специализации
    try {
        if (!specialisation) {
            result = {
                ...result,
                error: true,
            };
            result.validationErrors.specialisation = 'Такой специализации не существует.';
        }
    } catch (err) {
        if (err instanceof NotFoundError) {
            result = {
                ...result,
                error: true,
            };
            result.validationErrors.specialisation = 'Такой специализации не существует.';
        }
    }

    return result;
};

// Валидация специализации
export const validateSpecialisation = (specialisation) => {
    const { name } = specialisation;
    let result = { error: false };

    if (name.length === 0 || name.length > 30) {
        result = {
            ...result,
            error: true,
            validationErrors: {
                name: 'Обязательное поле. Не более 30 символов.',
            },
        };
    }
    return result;
};
