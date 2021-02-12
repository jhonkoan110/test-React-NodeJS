import { NotFoundError } from '../repositories/specialisation.repository';
import { getOneSpecialisation } from './specialisation.service';

// Валидация мастера
export const validateMaster = async (master) => {
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

    // Проверка поля
    const checkField = (fieldName, field, message, min, max) => {
        if (field.length === min || field.length > max) {
            result.error = true;
            result.validationErrors[fieldName] = message;
        }
        console.log(result.validationErrors);
    };

    // Проверка логина
    checkField('login', login, 'Обязательное поле. Не более 30 символов.', 0, 30);

    // Проверка имени
    checkField('firstname', firstname, 'Обязательное поле. Не более 30 символов.', 0, 30);

    // Проверка фамилии
    checkField('lastname', lastname, 'Обязательное поле. Не более 30 символов.', 0, 30);

    // Проверка отчества
    checkField('middlename', middlename, 'Не более 30 символов.', null, 30);

    // Проверка специализации
    try {
        const specialisation = await getOneSpecialisation(specialisation_id);
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
export const validateSpecialisation = async (specialisation) => {
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
