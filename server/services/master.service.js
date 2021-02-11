import {
    createMaster,
    getMasters,
    getOneMaster,
    updateMaster,
    deleteMaster,
    getMastersBySpecialisation,
} from '../repositories/master.repository';

export async function createMaster2(req, res) {
    const newMaster = await createMaster(req.body);
    res.json(newMaster.rows[0]);
}
export async function getMasters2(req, res) {
    const masters = await getMasters();
    res.json(masters.rows);
}
export async function getOneMaster2(req, res) {
    const id = req.params.id;
    const master = await getOneMaster(id);
    res.json(master.rows[0]);
}
export async function getMastersBySpecialisation2(req, res) {
    const specialisation_id = req.params.id;
    const master = await getMastersBySpecialisation(specialisation_id);
    res.json(master.rows);
}
export async function updateMaster2(req, res) {
    const master = await updateMaster(req.body);
    res.json(master.rows[0]);
}
export async function deleteMaster2(req, res) {
    const id = req.params.id;
    const master = await deleteMaster(id);
    res.json(master.rows[0]);
}
