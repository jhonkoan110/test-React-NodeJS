import db from '../db';

// Получить всех мастеров
export const getMasters = async () => {
    const masters = await db.query(`select master.id, master.login, master.firstName, master.lastName, master.middleName, master.specialisation_id, specialisation.name
    FROM master
    INNER JOIN specialisation
    ON master.specialisation_id=specialisation.id`);

    return masters.rows;
};

// Получить одного мастера
export const getOneMaster = async (id) => {
    const master = await db.query(`SELECT * FROM master where id = $1`, [id]);

    return master.rows[0];
};

// Создать мастера
export const createMaster = async (requestBody) => {
    const { login, firstname, lastname, middlename, specialisation_id } = requestBody;

    const newMaster = await db.query(
        `INSERT INTO master (login, firstname, lastname, middlename, specialisation_id) values ($1, $2, $3, $4, $5) RETURNING *`,
        [login, firstname, lastname, middlename, specialisation_id],
    );

    return newMaster.rows[0];
};

// Получить мастеров по специализации
export const getMastersBySpecialisation = async (specialisation_id) => {
    const masters = await db.query(`SELECT * FROM master where specialisation_id = $1`, [
        specialisation_id,
    ]);
    return masters.rows;
};

// Обновить мастера
export const updateMaster = async (requestBody) => {
    const { id, login, firstname, lastname, middlename, specialisation_id } = requestBody;

    const updatedMaster = await db.query(
        `UPDATE master SET login = $1, firstname = $2, lastname = $3, middlename = $4, specialisation_id = $5 where id = $6 RETURNING *`,
        [login, firstname, lastname, middlename, specialisation_id, id],
    );

    return updatedMaster.rows[0];
};

// Удалить мастера
export const deleteMaster = async (id) => {
    const master = await db.query(`DELETE FROM master where id = $1`, [id]);

    return master.rows[0];
};
