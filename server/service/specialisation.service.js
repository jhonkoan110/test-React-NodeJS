import {
    createSpecialisation,
    deleteSpecialisation,
    getOneSpecialisation,
    getSpecialisations,
    updateSpecialisation,
} from '../repository/specialisation.repository';

export const createSpecialisation2 = async (req, res) => {
    const { name } = req.body;
    const newSpecialisation = await createSpecialisation(name);
    res.json(newSpecialisation.rows[0]);
};

export const getSpecialisations2 = async (req, res) => {
    const specialisations = await getSpecialisations();
    res.json(specialisations.rows);
};

export const getOneSpecialisation2 = async (req, res) => {
    const id = req.params.id;
    const specialisation = await getOneSpecialisation(id);
    res.json(specialisation.rows[0]);
};

export const updateSpecialisation2 = async (req, res) => {
    const { id, name } = req.body;
    const specialisation = await updateSpecialisation(id, name);
    res.json(specialisation.rows[0]);
};

export const deleteSpecialisation2 = async (req, res) => {
    const id = req.params.id;

    const result = await deleteSpecialisation(id);
    if (result === 400) {
        res.status(400).json({
            title: `У этой специализации ещё есть мастер(-а)`,
        });
    } else {
        res.json(result.rows[0]);
    }

    // // Запрашиваются мастера по id специализации
    // const masters = await db.query(`SELECT * FROM master where specialisation_id = $1`, [id]);
    // // Если есть хотя бы 1, возвращается ошибка
    // if (masters.rows.length > 0) {
    //     res.status(400).json({
    //         title: `У этой специализации ещё есть мастер(-а)`,
    //     });
    //     // Если нет - специализация удаляется
    // } else {
    //     const specialisation = await db.query(`DELETE FROM specialisation where id = $1`, [id]);
    //     res.json(specialisation.rows[0]);
    // }
};
