import db from '../db';
import { NotFoundError } from './specialisation.repository';

// Получить всех мастеров
export const getMasters = async () => {
    try {
        const masters = await db.query(`select master.id, master.login, master.firstName, master.lastName, master.middleName, master.specialisation_id, specialisation.name
        FROM master
        INNER JOIN specialisation
        ON master.specialisation_id=specialisation.id`);
        return masters.rows;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Получить одного мастера по id
export const getOneMaster = async (id) => {
    try {
        const master = await db.query(`SELECT * FROM master where id = $1`, [id]);
        if (master.rows.length < 1) {
            throw new NotFound();
        }
        return master.rows[0];
    } catch (err) {
        if (err instanceof NotFound) {
            throw new NotFound('Такого мастера не найдено');
        } else {
            throw new Error(err.message);
        }
    }
};

// Создать мастера
export const createMaster = async (requestBody) => {
    try {
        const { login, firstname, lastname, middlename, specialisation_id } = requestBody;
        // Проверка, существует ли специализация
        const specialisation = await db.query(`SELECT * FROM specialisation where id = $1`, [
            specialisation_id,
        ]);
        if (specialisation.rows.length < 1) {
            throw new NotFoundError();
        }

        // Добавление мастера
        const newMaster = await db.query(
            `INSERT INTO master (login, firstname, lastname, middlename, specialisation_id) values ($1, $2, $3, $4, $5) RETURNING *`,
            [login, firstname, lastname, middlename, specialisation_id],
        );

        return newMaster.rows[0];
    } catch (err) {
        if (err instanceof NotFoundError) {
            throw new NotFoundError('Такой специализации не найдено');
        }
        throw new Error(err.message);
    }
};

// Получить мастеров по id специализации
export const getMastersBySpecialisation = async (specialisation_id) => {
    try {
        const masters = await db.query(`SELECT * FROM master where specialisation_id = $1`, [
            specialisation_id,
        ]);
        return masters.rows;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Обновить мастера
export const updateMaster = async (requestBody) => {
    try {
        const { id, login, firstname, lastname, middlename, specialisation_id } = requestBody;

        const master = await db.query(`SELECT FROM master where id = $1`, [id]);
        if (master.rows.length < 1) {
            throw new NotFound();
        }

        const updatedMaster = await db.query(
            `UPDATE master SET login = $1, firstname = $2, lastname = $3, middlename = $4, specialisation_id = $5 where id = $6 RETURNING *`,
            [login, firstname, lastname, middlename, specialisation_id, id],
        );

        return updatedMaster.rows[0];
    } catch (err) {
        if (err instanceof NotFound) {
            throw new NotFound('Такого мастера не найдено');
        } else {
            throw new Error(err.message);
        }
    }
};

// Удалить мастера по id
export const deleteMaster = async (id) => {
    try {
        let master = await db.query(`SELECT FROM master where id = $1`, [id]);

        if (master.rows.length < 1) {
            throw new NotFound();
        }

        master = await db.query(`DELETE FROM master where id = $1`, [id]);
        return master.rows[0];
    } catch (err) {
        if (err instanceof NotFound) {
            throw new NotFound('Такого мастера не найдено');
        } else {
            throw new Error(err.message);
        }
    }
};
