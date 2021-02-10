import db from '../db';

export const getSpecialisations = async () => {
    const specialisations = await db.query(`SELECT * FROM specialisation`);
    return specialisations;
};

export const getOneSpecialisation = async (id) => {
    const specialisation = await db.query(`SELECT * FROM specialisation where id = $1`, [id]);
    return specialisation;
};

export const createSpecialisation = async (name) => {
    const newSpecialisation = await db.query(
        `INSERT INTO specialisation (name) values ($1) RETURNING *`,
        [name],
    );

    return newSpecialisation;
};

export const updateSpecialisation = async (id, name) => {
    const specialisation = await db.query(
        `UPDATE specialisation set name = $1 where id = $2 RETURNING *`,
        [name, id],
    );

    return specialisation;
};

export const deleteSpecialisation = async (id) => {
    const masters = await db.query(`SELECT * FROM master where specialisation_id = $1`, [id]);

    if (masters.rows.length > 0) {
        return 400;
    } else {
        const specialisation = await db.query(`DELETE FROM specialisation where id = $1`, [id]);
        return specialisation;
    }
};
