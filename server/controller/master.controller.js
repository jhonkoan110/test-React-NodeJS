const db = require('../db');

class MasterController {
    async createMaster(req, res) {
        const { login, firstname, lastname, middlename, specialisation_id } = req.body;
        const newMaster = await db.query(
            `INSERT INTO master (login, firstname, lastname, middlename, specialisation_id) values ($1, $2, $3, $4, $5) RETURNING *`,
            [login, firstname, lastname, middlename, specialisation_id],
        );
        res.json(newMaster.rows[0]);
    }

    async getMasters(req, res) {
        const masters = await db.query(`select master.id, master.login, master.firstName, master.lastName, master.middleName, master.specialisation_id, specialisation.name
        FROM master
        INNER JOIN specialisation
        ON master.specialisation_id=specialisation.id`);
        res.json(masters.rows);
    }

    async getOneMaster(req, res) {
        const id = req.params.id;
        const specialisation = await db.query(`SELECT * FROM master where id = $1`, [id]);
        res.json(specialisation.rows[0]);
    }

    async getMastersBySpecialisation(req, res) {
        const id = req.query.id;
        const master = await db.query(`SELECT * FROM master where specialisation_id = $1`, [id]);
        res.json(master.rows);
    }

    async updateMaster(req, res) {
        const { id, login, firstname, lastname, middlename, specialisation_id } = req.body;
        const master = await db.query(
            `UPDATE master SET login = $1, firstname = $2, lastname = $3, middlename = $4, specialisation_id = $5 where id = $6 RETURNING *`,
            [login, firstname, lastname, middlename, specialisation_id, id],
        );
        res.json(master.rows[0]);
    }

    async deleteMaster(req, res) {
        try {
            const id = req.params.id;
            const master = await db.query(`DELETE FROM master where id  = $1`, [id]);
            res.json(master.rows[0]);
        } catch (error) {}
    }
}

module.exports = new MasterController();
