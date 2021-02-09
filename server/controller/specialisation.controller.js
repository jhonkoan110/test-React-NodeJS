const db = require('../db');

class SpecialisationController {
    async createSpecialisation(req, res) {
        const { name } = req.body;
        const newSpecialisation = await db.query(
            `INSERT INTO specialisation (name) values ($1) RETURNING *`,
            [name],
        );
        res.json(newSpecialisation.rows[0]);
    }

    async getSpecialisations(req, res) {
        const specialisations = await db.query(`SELECT * FROM specialisation`);
        res.json(specialisations.rows);
    }

    async getOneSpecialisation(req, res) {
        const id = req.params.id;
        const specialisation = await db.query(`SELECT * FROM specialisation where id = $1`, [id]);
        res.json(specialisation.rows[0]);
    }

    async updateSpecialisation(req, res) {
        const { id, name } = req.body;
        const specialisation = await db.query(
            `UPDATE specialisation set name = $1 where id = $2 RETURNING *`,
            [name, id],
        );
        res.json(specialisation.rows[0]);
    }

    async deleteSpecialisation(req, res) {
        const id = req.params.id;
        // Запрашиваются мастера по id специализации
        const masters = await db.query(`SELECT * FROM master where specialisation_id = $1`, [id]);
        // Если есть хотя бы 1, возвращается ошибка
        if (masters.rows.length > 0) {
            res.status(400).json({
                title: `У этой специализации ещё есть мастер(-а)`,
            });
            // Если нет - специализация удаляется
        } else {
            const specialisation = await db.query(`DELETE FROM specialisation where id = $1`, [id]);
            res.json(specialisation.rows[0]);
        }
    }
}

module.exports = new SpecialisationController();
