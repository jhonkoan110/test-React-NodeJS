import db from '../db';

// Ошибка "не найдено"
export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

// Ошибка удаления специализации(если у нее есть мастер(-а))
export class DeleteSpecialisationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DeleteMasterError';
    }
}

// Получить специализации
export const getSpecialisations = async () => {
    try {
        const specialisations = await db.query(`SELECT * FROM specialisation`);
        return specialisations.rows;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Получить одну специализацию по id
export const getOneSpecialisation = async (id) => {
    try {
        const specialisation = await db.query(`SELECT * FROM specialisation where id = $1`, [id]);
        if (specialisation.rows.length < 1) {
            throw new NotFoundError();
        }
        return specialisation.rows[0];
    } catch (err) {
        if (err instanceof NotFoundError) {
            throw new NotFoundError('Такой специализации не найдено');
        } else {
            throw new Error(err.message);
        }
    }
};

// Создать специализацию
export const createSpecialisation = async (name) => {
    try {
        const newSpecialisation = await db.query(
            `INSERT INTO specialisation (name) values ($1) RETURNING *`,
            [name],
        );
        return newSpecialisation.rows[0];
    } catch (err) {
        throw new Error(err.message);
    }
};

// Обновить специализацию не работает trycatch
export const updateSpecialisation = async (id, name) => {
    try {
        let specialisation = await db.query(`SELECT * FROM specialisation where id = $1`, [id]);
        if (specialisation.rows.length < 1) {
            throw new NotFoundError();
        }
        specialisation = await db.query(
            `UPDATE specialisation set name = $1 where id = $2 RETURNING *`,
            [name, id],
        );
        return specialisation.rows[0];
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такой специализации не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};

// Удалить специализацию
export const deleteSpecialisation = async (id) => {
    try {
        const masters = await db.query(`SELECT * FROM master where specialisation_id = $1`, [id]);
        if (masters.rows.length > 0) {
            throw new DeleteMasterError();
        }
        let specialisation = await db.query(`SELECT * FROM specialisation where id = $1`, [id]);
        if (specialisation.rows.length < 1) {
            throw new NotFoundError();
        }
        specialisation = await db.query(`DELETE FROM specialisation where id = $1`, [id]);
        return specialisation.rows[0];
    } catch (err) {
        if (err instanceof DeleteMasterError) {
            throw new DeleteSpecialisationError('У этой специализации ещё есть мастер(-а)');
        } else if (err instanceof NotFoundError) {
            throw new NotFoundError('Такой специализации не найдено');
        } else {
            throw new Error(err.message);
        }
    }
};
